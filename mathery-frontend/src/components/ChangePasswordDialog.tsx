"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound, Eye, EyeOff, Loader2, Check, AlertTriangle } from 'lucide-react'
import { toast } from "sonner"

interface ChangePasswordDialogProps {
    children: React.ReactNode
}

export const ChangePasswordDialog = ({ children }: ChangePasswordDialogProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const validateForm = () => {
        const newErrors = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Current password is required"
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required"
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters"
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your new password"
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error !== "")
    }

    const handleSubmit = async () => {
        if (!validateForm()) return

        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            toast.success("Password changed successfully!", {
                description: "Your password has been updated securely.",
                action: {
                    label: "Got it",
                    onClick: () => {},
                },
            })

            setOpen(false)
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            setErrors({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        } catch (error) {
            toast.error("Failed to change password", {
                description: "Please try again later or contact support.",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (!newOpen) {
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            setErrors({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <KeyRound className="h-5 w-5" />
                        Change Password
                    </DialogTitle>
                    <DialogDescription>
                        Update your password to keep your account secure. Make sure to use a strong password.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Current Password */}
                    <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-sm font-medium">
                            Current Password *
                        </Label>
                        <div className="relative">
                            <Input
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter your current password"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                className={errors.currentPassword ? "border-destructive" : ""}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {errors.currentPassword}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-sm font-medium">
                            New Password *
                        </Label>
                        <div className="relative">
                            <Input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className={errors.newPassword ? "border-destructive" : ""}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {errors.newPassword}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm font-medium">
                            Confirm New Password *
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your new password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className={errors.confirmPassword ? "border-destructive" : ""}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="p-3 rounded-lg bg-muted/50 border">
                        <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li className="flex items-center gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full ${formData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                                At least 8 characters long
                            </li>
                            <li className="flex items-center gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full ${/[A-Z]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                                Contains uppercase letter
                            </li>
                            <li className="flex items-center gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full ${/[a-z]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                                Contains lowercase letter
                            </li>
                            <li className="flex items-center gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full ${/\d/.test(formData.newPassword) ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                                Contains number
                            </li>
                        </ul>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading} className="gap-2">
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Check className="h-4 w-4" />
                                Update Password
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
