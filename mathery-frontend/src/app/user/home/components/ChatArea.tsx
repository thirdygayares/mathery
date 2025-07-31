"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useMatheryStore } from "../store"
import { MessageCard } from "./MessageCard"
import { MessageHeader } from "./MessageHeader"

export function ChatArea() {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [textareaHeight, setTextareaHeight] = useState(40)
    const [hasInitiallyScrolled, setHasInitiallyScrolled] = useState(false)

    const {
        selectedConversation,
        messages,
        messagesLoading,
        currentMessage,
        isStreaming,
        streamingMessage,
        isTyping,
        connectionStatus,
        setCurrentMessage,
        sendChatMessage,
    } = useMatheryStore()

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "40px"
            const scrollHeight = textareaRef.current.scrollHeight
            const newHeight = Math.min(Math.max(scrollHeight, 40), 120)
            textareaRef.current.style.height = `${newHeight}px`
            setTextareaHeight(newHeight)
        }
    }, [currentMessage])

    // Reset scroll state when conversation changes
    useEffect(() => {
        setHasInitiallyScrolled(false)
    }, [selectedConversation?.mathery_uuid])

    // Initial scroll to bottom when messages first load
    useEffect(() => {
        if (messages.length > 0 && !messagesLoading && !hasInitiallyScrolled) {
            if (messagesEndRef.current) {
                // Immediate scroll without animation for initial load
                messagesEndRef.current.scrollIntoView({ behavior: "auto" })
                setHasInitiallyScrolled(true)
            }
        }
    }, [messages.length, messagesLoading, hasInitiallyScrolled])

    // Smooth scroll for new messages, streaming, and typing
    useEffect(() => {
        if (hasInitiallyScrolled) {
            const scrollToBottom = () => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
                }
            }

            // Small delay to ensure DOM is updated
            const timeoutId = setTimeout(scrollToBottom, 100)
            return () => clearTimeout(timeoutId)
        }
    }, [streamingMessage, isStreaming, isTyping, hasInitiallyScrolled])

    // Smooth scroll when new messages are added (after initial load)
    useEffect(() => {
        if (hasInitiallyScrolled && messages.length > 0) {
            const scrollToBottom = () => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
                }
            }

            const timeoutId = setTimeout(scrollToBottom, 100)
            return () => clearTimeout(timeoutId)
        }
    }, [messages.length, hasInitiallyScrolled])

    const handleSend = async () => {
        if (!currentMessage.trim() || isStreaming || !selectedConversation) return

        const message = currentMessage.trim()
        setCurrentMessage("")
        await sendChatMessage(message)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const getConnectionBadge = () => {
        const config = {
            connected: { color: "bg-green-100 text-green-800", icon: Wifi, label: "Connected" },
            connecting: { color: "bg-yellow-100 text-yellow-800", icon: Loader2, label: "Connecting" },
            disconnected: { color: "bg-gray-100 text-gray-800", icon: WifiOff, label: "Disconnected" },
            error: { color: "bg-red-100 text-red-800", icon: WifiOff, label: "Connection Error" },
        }

        const { color, icon: Icon, label } = config[connectionStatus]
        return (
            <Badge variant="secondary" className={`${color} text-xs`}>
                <Icon className={`w-3 h-3 mr-1 ${connectionStatus === "connecting" ? "animate-spin" : ""}`} />
                {label}
            </Badge>
        )
    }

    if (!selectedConversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Send className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Mathery</h3>
                    <p className="text-gray-600 max-w-md">
                        Select a conversation from the sidebar or start a new one to begin chatting with your AI math tutor.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <MessageHeader conversation={selectedConversation} connectionBadge={getConnectionBadge()} />

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea ref={scrollAreaRef} className="h-full">
                    <div className="p-4">
                        <div className="max-w-4xl mx-auto space-y-4">
                            {messagesLoading && messages.length === 0 ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                                    <span className="text-gray-600">Loading messages...</span>
                                </div>
                            ) : (
                                <>
                                    {/* Sort messages by created_at to ensure proper order */}
                                    {messages
                                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                                        .map((message, index) => {
                                            console.log("Rendering message:", message.role, message.message.substring(0, 50)) // Debug log
                                            return (
                                                <MessageCard
                                                    key={`${message.mathery_convo_id}-${index}-${message.created_at}`}
                                                    message={message}
                                                />
                                            )
                                        })}

                                    {/* Streaming message */}
                                    {isStreaming && (
                                        <MessageCard
                                            message={{
                                                mathery_convo_id: -1,
                                                message: streamingMessage,
                                                type: "MD",
                                                role: "AI",
                                                created_at: new Date().toISOString(),
                                                updated_at: new Date().toISOString(),
                                                deleted_at: null,
                                            }}
                                            isStreaming={true}
                                        />
                                    )}

                                    {/* Typing indicator */}
                                    {isTyping && !isStreaming && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">AI</span>
                                            </div>
                                            <div className="bg-gray-100 rounded-2xl px-4 py-2">
                                                <div className="flex space-x-1">
                                                    <div
                                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                        style={{ animationDelay: "0ms" }}
                                                    />
                                                    <div
                                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                        style={{ animationDelay: "150ms" }}
                                                    />
                                                    <div
                                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                        style={{ animationDelay: "300ms" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Invisible element to scroll to */}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Input */}
            <div className="border-t border-blue-100 p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 relative">
                            <Textarea
                                ref={textareaRef}
                                placeholder="Ask your math question..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isStreaming}
                                className="resize-none border-blue-200 focus:border-blue-400 pr-12"
                                style={{ height: `${textareaHeight}px` }}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-gray-400">{currentMessage.length}/2000</div>
                        </div>

                        <Button
                            onClick={handleSend}
                            disabled={!currentMessage.trim() || isStreaming || connectionStatus !== "connected"}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-10 px-4"
                        >
                            {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Press Enter to send, Shift+Enter for new line</span>
                        {getConnectionBadge()}
                    </div>
                </div>
            </div>
        </div>
    )
}
