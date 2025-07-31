import axios from "@/lib/axios"
import type {
    MatheryConversation,
    MatheryMessage,
    ConversationFilterParams,
    MessageFilterParams,
    PaginatedResponse,
} from "../types"

export const getConversations = async (
    params: ConversationFilterParams,
): Promise<PaginatedResponse<MatheryConversation>> => {
    const response = await axios.get("/api/mathery", { params })
    return response.data
}

export const getMessages = async (params: MessageFilterParams): Promise<PaginatedResponse<MatheryMessage>> => {
    const response = await axios.get(`/api/mathery/${params.mathery_uuid}/convo`, {
        params: {
            search: params.search,
            sort_by: params.sort_by,
            sort_order: params.sort_order,
            page: params.page,
            count_per_page: params.count_per_page,
        },
    })
    console.log("Messages response:", response.data)
    return response.data
}

export const createConversation = async (payload: {
    name: string
    summary: string
}): Promise<MatheryConversation> => {
    const response = await axios.post("/api/mathery", payload)
    return response.data
}

export const sendMessage = async (
    matheryUuid: string,
    payload: {
        message: string
    },
): Promise<void> => {
    await axios.post(`/api/mathery/${matheryUuid}/convo`, payload)
}
