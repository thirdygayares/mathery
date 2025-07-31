"use client"

import type React from "react"

import { MessageCircle, Calendar, Hash } from "lucide-react"
import type { MatheryConversation } from "../types"

interface MessageHeaderProps {
    conversation: MatheryConversation
    connectionBadge: React.ReactNode
}

export function MessageHeader({ conversation, connectionBadge }: MessageHeaderProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="border-b border-blue-100 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold text-blue-900">{conversation.name}</h1>
                            <div className="flex items-center gap-4 text-sm text-blue-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>Created {formatDate(conversation.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Hash className="w-3 h-3" />
                                    <span className="font-mono text-xs">{conversation.mathery_uuid.slice(0, 8)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">{connectionBadge}</div>
                </div>
            </div>
        </div>
    )
}
