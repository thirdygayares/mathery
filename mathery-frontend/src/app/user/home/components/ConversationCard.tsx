"use client"

import { MessageCircle, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { MatheryConversation } from "../types"

interface ConversationCardProps {
    conversation: MatheryConversation
    isSelected: boolean
    onClick: () => void
    formatDate: (date: string) => string
}

export function ConversationCard({ conversation, isSelected, onClick, formatDate }: ConversationCardProps) {
    return (
        <Card
            className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-sm"
                    : "hover:bg-blue-50/50 border-gray-200"
            }`}
            onClick={onClick}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected
                            ? "bg-gradient-to-br from-blue-500 to-indigo-500"
                            : "bg-gradient-to-br from-blue-100 to-indigo-100"
                    }`}
                >
                    <MessageCircle className={`w-5 h-5 ${isSelected ? "text-white" : "text-blue-600"}`} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-sm truncate mb-1 ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                        {conversation.name}
                    </h3>

                    <p className={`text-xs line-clamp-2 mb-2 ${isSelected ? "text-blue-700" : "text-gray-600"}`}>
                        {conversation.summary}
                    </p>

                    <div className={`flex items-center gap-1 text-xs ${isSelected ? "text-blue-600" : "text-gray-500"}`}>
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(conversation.updated_at)}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
