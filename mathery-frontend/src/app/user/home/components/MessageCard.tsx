"use client"

import { User, Bot, Clock, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import type { MatheryMessage } from "../types"

interface MessageCardProps {
    message: MatheryMessage
    isStreaming?: boolean
}

export function MessageCard({ message, isStreaming = false }: MessageCardProps) {
    const [copied, setCopied] = useState(false)

    // Fix the role detection - check the actual role value
    const isUser = message.role === "USER"
    const isAI = message.role === "AI"

    console.log("Message role:", message.role, "isUser:", isUser, "isAI:", isAI) // Debug log

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.message)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
            {/* AI Avatar - show on left for AI messages */}
            {isAI && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                </div>
            )}

            <div className={`max-w-[80%] ${isUser ? "order-1" : ""}`}>
                <Card
                    className={`p-4 ${
                        isUser
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600"
                            : "bg-white border-gray-200 hover:border-blue-200 transition-colors"
                    }`}
                >
                    <div className="space-y-2">
                        {/* Message content */}
                        <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : "prose-blue"}`}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                        components={{
                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                            code: ({ children, className }) => {
                                                const isInline = !className
                                                return isInline ? (
                                                    <code
                                                        className={`px-1 py-0.5 rounded text-xs font-mono ${
                                                            isUser ? "bg-blue-700 text-blue-100" : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {children}
                                                    </code>
                                                ) : (
                                                    <pre
                                                        className={`p-3 rounded-lg overflow-x-auto ${
                                                            isUser ? "bg-blue-700 text-blue-100" : "bg-gray-100"
                                                        }`}
                                                    >
                            <code className="text-sm font-mono">{children}</code>
                          </pre>
                                                )
                                            },
                                            blockquote: ({ children }) => (
                                                <blockquote
                                                    className={`border-l-4 pl-4 italic ${isUser ? "border-blue-300" : "border-blue-400"}`}
                                                >
                                                    {children}
                                                </blockquote>
                                            ),
                                        }}
                                    >
                                        {message.message}
                                    </ReactMarkdown>


                            {/* Streaming cursor */}
                            {isStreaming && <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1" />}
                        </div>

                        {/* Message footer */}
                        <div className={`flex items-center justify-between text-xs ${isUser ? "text-blue-100" : "text-gray-500"}`}>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTime(message.created_at)}</span>
                                {isStreaming && <span className="ml-2 text-blue-600 font-medium">Generating...</span>}
                            </div>

                            {isAI && !isStreaming && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopy}
                                    className="h-6 px-2 text-gray-500 hover:text-gray-700"
                                >
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            {/* User Avatar - show on right for user messages */}
            {/*{isUser && (*/}
            {/*    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">*/}
            {/*        <User className="w-4 h-4 text-white" />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}
