"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Search, Plus, MessageCircle, Calendar, ArrowUpDown, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMatheryStore } from "../store"
import { useSearchDebounce } from "@/hooks/useSearchDebounce"
import { ConversationCard } from "./ConversationCard"
import { NewConversationDialog } from "./NewConversationDialog"

export function ConversationSidebar() {
    const [showNewDialog, setShowNewDialog] = useState(false)
    const { ref, inView } = useInView({ threshold: 0 })

    const {
        conversations,
        selectedConversation,
        conversationsLoading,
        conversationsHasMore,
        conversationsSearch,
        conversationsSortBy,
        conversationsSortOrder,
        conversationsTotalCount,
        setConversationsSearch,
        setConversationsSortBy,
        setConversationsSortOrder,
        setSelectedConversation,
        fetchConversations,
        fetchMoreConversations,
    } = useMatheryStore()

    const debouncedSearch = useSearchDebounce(conversationsSearch, 300)

    useEffect(() => {
        fetchConversations()
    }, [debouncedSearch, conversationsSortBy, conversationsSortOrder, fetchConversations])

    useEffect(() => {
        if (inView && conversationsHasMore && !conversationsLoading) {
            fetchMoreConversations()
        }
    }, [inView, conversationsHasMore, conversationsLoading, fetchMoreConversations])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 24) {
            return date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            })
        } else if (diffInHours < 168) {
            // 7 days
            return date.toLocaleDateString("en-US", { weekday: "short" })
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            })
        }
    }

    return (
        <div className="w-80 bg-white border-r border-blue-200 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-blue-100">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-blue-900">Conversations</h2>
                    <Button
                        onClick={() => setShowNewDialog(true)}
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        New
                    </Button>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search conversations..."
                        value={conversationsSearch}
                        onChange={(e) => setConversationsSearch(e.target.value)}
                        className="pl-10 pr-10 border-blue-200 focus:border-blue-400"
                    />
                    {conversationsSearch && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConversationsSearch("")}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                {/* Sort */}
                <div className="flex gap-2">
                    <Select value={conversationsSortBy} onValueChange={setConversationsSortBy}>
                        <SelectTrigger className="flex-1 h-9 border-blue-200">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="updated_at">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Last Updated
                                </div>
                            </SelectItem>
                            <SelectItem value="created_at">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Created Date
                                </div>
                            </SelectItem>
                            <SelectItem value="name">
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" />
                                    Name
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConversationsSortOrder(conversationsSortOrder === "asc" ? "desc" : "asc")}
                        className="px-2 border-blue-200"
                    >
                        <ArrowUpDown className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Conversations List */}
            <ScrollArea className="flex-1">
                <div className="p-2">
                    {conversations.length === 0 && !conversationsLoading ? (
                        <div className="text-center py-8">
                            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">No conversations found</p>
                            <Button onClick={() => setShowNewDialog(true)} variant="outline" size="sm" className="mt-3">
                                Start your first conversation
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {conversations.map((conversation) => (
                                <ConversationCard
                                    key={conversation.mathery_uuid}
                                    conversation={conversation}
                                    isSelected={selectedConversation?.mathery_uuid === conversation.mathery_uuid}
                                    onClick={() => setSelectedConversation(conversation)}
                                    formatDate={formatDate}
                                />
                            ))}

                            {/* Infinite scroll trigger */}
                            {conversationsHasMore && (
                                <div ref={ref} className="py-4 text-center">
                                    {conversationsLoading && <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-600" />}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-3 border-t border-blue-100 text-xs text-gray-500 text-center">
                {conversationsTotalCount > 0 && <span>{conversationsTotalCount} total conversations</span>}
            </div>

            <NewConversationDialog open={showNewDialog} onOpenChange={setShowNewDialog} />
        </div>
    )
}
