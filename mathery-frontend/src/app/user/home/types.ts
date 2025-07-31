export interface MatheryConversation {
    mathery_uuid: string
    topic_uuid: string | null
    name: string
    summary: string
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export interface MatheryMessage {
    mathery_convo_id: number
    message: string
    type: "TEXT" | "IMAGE" | "MD"
    role: "USER" | "AI"
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export interface ConversationFilterParams {
    search?: string
    sort_by?: "created_at" | "updated_at" | "name"
    sort_order?: "asc" | "desc"
    page?: number
    count_per_page?: number
}

export interface MessageFilterParams {
    mathery_uuid: string
    search?: string
    sort_by?: "created_at"
    sort_order?: "asc" | "desc"
    page?: number
    count_per_page?: number
}

export interface PaginatedResponse<T> {
    page: number
    count_per_page: number
    total_count: number
    data: T[]
    messages?: T[]
}



export interface WebSocketMessage {
    type: "message_chunk" | "done" | "error" | "typing"
    data?: string
    message?: string
    error?: string
}

export type SortBy = "created_at" | "updated_at" | "name"
export type SortOrder = "asc" | "desc"
