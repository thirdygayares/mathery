"use client"

import { useEffect } from "react"
import { ConversationSidebar } from "./components/ConversationSidebar"
import { ChatArea } from "./components/ChatArea"
import {useMatheryStore} from "@/app/user/home/store";

export default function UserHomePage() {
    const { fetchConversations, disconnectWebSocket } = useMatheryStore()

    useEffect(() => {
        fetchConversations()

        // Cleanup WebSocket on unmount
        return () => {
            disconnectWebSocket()
        }
    }, [fetchConversations, disconnectWebSocket])

    return (
        <div className="h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
            <ConversationSidebar />
            <ChatArea />
        </div>
    )
}
