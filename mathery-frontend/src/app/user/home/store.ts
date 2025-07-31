"use client"

import { create } from "zustand"
import type { AxiosError } from "axios"
import type { MatheryConversation, MatheryMessage, SortBy, SortOrder, WebSocketMessage } from "./types"
import {createConversation, getConversations, getMessages, sendMessage} from "@/app/user/home/service/matheryService";

interface MatheryState {
    // Conversations
    conversations: MatheryConversation[]
    selectedConversation: MatheryConversation | null
    conversationsLoading: boolean
    conversationsHasMore: boolean
    conversationsPage: number
    conversationsSearch: string
    conversationsSortBy: SortBy
    conversationsSortOrder: SortOrder
    conversationsTotalCount: number

    // Messages
    messages: MatheryMessage[]
    messagesLoading: boolean
    messagesHasMore: boolean
    messagesPage: number
    messagesSearch: string
    messagesTotalCount: number

    // Chat state
    currentMessage: string
    isTyping: boolean
    isStreaming: boolean
    streamingMessage: string
    websocket: WebSocket | null
    connectionStatus: "connecting" | "connected" | "disconnected" | "error"

    // Actions - Conversations
    setConversationsSearch: (search: string) => void
    setConversationsSortBy: (sortBy: SortBy) => void
    setConversationsSortOrder: (sortOrder: SortOrder) => void
    setSelectedConversation: (conversation: MatheryConversation | null) => void
    fetchConversations: () => Promise<void>
    fetchMoreConversations: () => Promise<void>
    createNewConversation: (name: string, message: string) => Promise<void>

    // Actions - Messages
    setMessagesSearch: (search: string) => void
    fetchMessages: (matheryUuid: string) => Promise<void>
    fetchMoreMessages: (matheryUuid: string) => Promise<void>

    // Actions - Chat
    setCurrentMessage: (message: string) => void
    sendChatMessage: (message: string) => Promise<void>
    connectWebSocket: (matheryUuid: string) => void
    disconnectWebSocket: () => void
    addMessage: (message: MatheryMessage) => void
    updateStreamingMessage: (chunk: string) => void
    completeStreamingMessage: () => void
    setIsTyping: (typing: boolean) => void
}

export const useMatheryStore = create<MatheryState>((set, get) => ({
    // Initial state
    conversations: [],
    selectedConversation: null,
    conversationsLoading: false,
    conversationsHasMore: true,
    conversationsPage: 1,
    conversationsSearch: "",
    conversationsSortBy: "updated_at",
    conversationsSortOrder: "desc",
    conversationsTotalCount: 0,

    messages: [],
    messagesLoading: false,
    messagesHasMore: true,
    messagesPage: 1,
    messagesSearch: "",
    messagesTotalCount: 0,

    currentMessage: "",
    isTyping: false,
    isStreaming: false,
    streamingMessage: "",
    websocket: null,
    connectionStatus: "disconnected",

    // Conversation actions
    setConversationsSearch: (search) => set({ conversationsSearch: search, conversationsPage: 1 }),
    setConversationsSortBy: (sortBy) => set({ conversationsSortBy: sortBy, conversationsPage: 1 }),
    setConversationsSortOrder: (sortOrder) => set({ conversationsSortOrder: sortOrder, conversationsPage: 1 }),
    setSelectedConversation: (conversation) => {
        set({ selectedConversation: conversation, messages: [], messagesPage: 1 })
        if (conversation) {
            get().fetchMessages(conversation.mathery_uuid)
            get().connectWebSocket(conversation.mathery_uuid)
        } else {
            get().disconnectWebSocket()
        }
    },

    fetchConversations: async () => {
        set({ conversationsLoading: true, conversationsPage: 1 })
        try {
            const { conversationsSearch, conversationsSortBy, conversationsSortOrder } = get()
            const response = await getConversations({
                search: conversationsSearch,
                sort_by: conversationsSortBy,
                sort_order: conversationsSortOrder,
                page: 1,
                count_per_page: 20,
            })

            set({
                conversations: response.data,
                conversationsHasMore: response.data.length === 20,
                conversationsTotalCount: response.total_count,
                conversationsLoading: false,
            })
        } catch (error) {
            const err = error as AxiosError<{ detail: string }>
            console.error(err.response?.data.detail || "Failed to fetch conversations")
            set({ conversationsLoading: false })
        }
    },

    fetchMoreConversations: async () => {
        const { conversationsPage, conversationsHasMore, conversationsLoading, conversations } = get()
        if (!conversationsHasMore || conversationsLoading) return

        set({ conversationsLoading: true })
        try {
            const { conversationsSearch, conversationsSortBy, conversationsSortOrder } = get()
            const response = await getConversations({
                search: conversationsSearch,
                sort_by: conversationsSortBy,
                sort_order: conversationsSortOrder,
                page: conversationsPage + 1,
                count_per_page: 20,
            })

            set({
                conversations: [...conversations, ...response.data],
                conversationsHasMore: response.data.length === 20,
                conversationsPage: conversationsPage + 1,
                conversationsLoading: false,
            })
        } catch (error) {
            const err = error as AxiosError<{ detail: string }>
            console.error(err.response?.data.detail || "Failed to fetch more conversations")
            set({ conversationsLoading: false })
        }
    },

    createNewConversation: async (name: string, message: string) => {
        try {
            const newConversation = await createConversation({ name, summary: message })
            set((state) => ({
                conversations: [newConversation, ...state.conversations],
                selectedConversation: newConversation,
                messages: [],
                messagesPage: 1,
            }))

            // Send the first message
            await get().sendChatMessage(message)
            get().connectWebSocket(newConversation.mathery_uuid)
        } catch (error) {
            const err = error as AxiosError<{ detail: string }>
            console.error(err.response?.data.detail || "Failed to create conversation")
            throw error
        }
    },

    // Message actions
    setMessagesSearch: (search) => set({ messagesSearch: search, messagesPage: 1 }),

    fetchMessages: async (matheryUuid: string) => {
        set({ messagesLoading: true, messagesPage: 1 })
        try {
            const { messagesSearch } = get()
            const response = await getMessages({
                mathery_uuid: matheryUuid,
                search: messagesSearch,
                sort_by: "created_at",
                sort_order: "desc",
                page: 1,
                count_per_page: 50,
            })

            console.log(response.messages)

            set({
                messages: response.messages,
                messagesHasMore: response.count_per_page === 50,
                messagesTotalCount: response.total_count,
                messagesLoading: false,
            })
        } catch (error) {
            const err = error as AxiosError<{ detail: string }>
            console.error(err.response?.data.detail || "Failed to fetch messages")
            set({ messagesLoading: false })
        }
    },

    fetchMoreMessages: async (matheryUuid: string) => {
        const { messagesPage, messagesHasMore, messagesLoading, messages } = get()
        if (!messagesHasMore || messagesLoading) return

        set({ messagesLoading: true })
        try {
            const { messagesSearch } = get()
            const response = await getMessages({
                mathery_uuid: matheryUuid,
                search: messagesSearch,
                sort_by: "created_at",
                sort_order: "desc",
                page: messagesPage + 1,
                count_per_page: 50,
            })

            console.log("Fetched more messages:", response.data)

            set({
                messages: [...messages, ...response.data],
                messagesHasMore: response.data.length === 50,
                messagesPage: messagesPage + 1,
                messagesLoading: false,
            })
        } catch (error) {
            const err = error as AxiosError<{ detail: string }>
            console.error(err.response?.data.detail || "Failed to fetch more messages")
            set({ messagesLoading: false })
        }
    },

    // Chat actions
    setCurrentMessage: (message) => set({ currentMessage: message }),

    sendChatMessage: async (message: string) => {
        const { selectedConversation } = get()
        if (!selectedConversation) return

        try {
            // Add user message immediately
            const userMessage: MatheryMessage = {
                mathery_convo_id: Date.now(), // Temporary ID
                message,
                type: "TEXT",
                role: "USER",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null,
            }

            get().addMessage(userMessage)
            set({ currentMessage: "", isStreaming: true, streamingMessage: "" })

            await sendMessage(selectedConversation.mathery_uuid, { message })
        } catch (error) {
            const err = error as AxiosError<{ detail: string }>
            console.error(err.response?.data.detail || "Failed to send message")
            set({ isStreaming: false })
        }
    },

    connectWebSocket: (matheryUuid: string) => {
        const { websocket } = get()
        if (websocket) {
            websocket.close()
        }

        set({ connectionStatus: "connecting" })

        // const ws = new WebSocket(`wss://mathery-api.thirdygayares.com/ws/mathery/${matheryUuid}/convo`)

        const ws = new WebSocket(`ws://localhost:8000/ws/mathery/${matheryUuid}/convo`)

        ws.onopen = () => {
            set({ connectionStatus: "connected" })
        }

        ws.onmessage = (event) => {
            try {
                const data: WebSocketMessage = JSON.parse(event.data)

                switch (data.type) {
                    case "message_chunk":
                        if (data.data) {
                            get().updateStreamingMessage(data.data)
                        }
                        break
                    case "done":
                        get().completeStreamingMessage()
                        break
                    case "typing":
                        get().setIsTyping(true)
                        break
                    case "error":
                        console.error("WebSocket error:", data.error)
                        set({ isStreaming: false, connectionStatus: "error" })
                        break
                }
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error)
            }
        }

        ws.onclose = () => {
            set({ connectionStatus: "disconnected", websocket: null })
        }

        ws.onerror = () => {
            set({ connectionStatus: "error" })
        }

        set({ websocket: ws })
    },

    disconnectWebSocket: () => {
        const { websocket } = get()
        if (websocket) {
            websocket.close()
        }
        set({ websocket: null, connectionStatus: "disconnected" })
    },

    addMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message],
        }))
    },

    updateStreamingMessage: (chunk) => {
        set((state) => ({
            streamingMessage: state.streamingMessage + chunk,
            isTyping: false,
        }))
    },

    completeStreamingMessage: () => {
        const { streamingMessage } = get()
        if (streamingMessage) {
            const aiMessage: MatheryMessage = {
                mathery_convo_id: Date.now(),
                message: streamingMessage,
                type: "MD",
                role: "AI",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null,
            }

            get().addMessage(aiMessage)
        }

        set({
            isStreaming: false,
            streamingMessage: "",
            isTyping: false,
        })
    },

    setIsTyping: (typing) => set({ isTyping: typing }),
}))
