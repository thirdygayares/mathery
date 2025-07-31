"use client"

import { useState } from "react"
import { MessageCircle, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useMatheryStore } from "../store"

interface NewConversationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NewConversationDialog({ open, onOpenChange }: NewConversationDialogProps) {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { createNewConversation } = useMatheryStore()

    const handleCreate = async () => {
        if (!name.trim() || !message.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        setIsLoading(true)
        try {
            await createNewConversation(name.trim(), message.trim())
            toast.success("Conversation started!")
            setName("")
            setMessage("")
            onOpenChange(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.detail || "Failed to create conversation")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        if (!isLoading) {
            setName("")
            setMessage("")
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                        Start New Conversation
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Conversation Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="e.g., Algebra Help, Calculus Questions..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-blue-200 focus:border-blue-400"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">
                            Your First Message
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Ask your math question here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[100px] border-blue-200 focus:border-blue-400 resize-none"
                            disabled={isLoading}
                        />
                    </div>

                    {name && message && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="text-sm text-blue-800">
                                <strong>Preview:</strong> Starting "{name}" with your question
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        disabled={isLoading || !name.trim() || !message.trim()}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Start Conversation
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
