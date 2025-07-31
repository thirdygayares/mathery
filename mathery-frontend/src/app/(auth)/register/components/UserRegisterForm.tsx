"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, UserPlus, Lock, Mail, ArrowRight, Sparkles, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRegister } from "@/app/(auth)/register/hooks/useRegister"
import Link from "next/link"

export function UserRegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { userRegister, loading, error } = useRegister()

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return
        }

        const registerData = {
            email: formData.email,
            password: formData.password,
            first_name: formData.first_name,
            last_name: formData.last_name,
        }

        await userRegister(registerData)
    }

    return (
        <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
            <CardHeader className="space-y-6 pb-8 pt-10 px-8">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Join Mathery
                        </CardTitle>
                        <CardDescription className="text-lg text-slate-600">
                            Start your AI-powered learning journey
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label htmlFor="first_name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                First Name
                            </Label>
                            <Input
                                id="first_name"
                                type="text"
                                placeholder="John"
                                value={formData.first_name}
                                onChange={(e) => handleInputChange("first_name", e.target.value)}
                                className="h-12 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="last_name" className="text-sm font-semibold text-slate-700">
                                Last Name
                            </Label>
                            <Input
                                id="last_name"
                                type="text"
                                placeholder="Doe"
                                value={formData.last_name}
                                onChange={(e) => handleInputChange("last_name", e.target.value)}
                                className="h-12 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="h-12 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-3">
                        <Label htmlFor="password" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className="h-12 pr-12 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-slate-100 rounded-lg"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-slate-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-slate-400" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-3">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                className="h-12 pr-12 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-slate-100 rounded-lg"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-slate-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-slate-400" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Password Mismatch Error */}
                    {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm font-medium text-red-600">Passwords do not match</p>
                        </div>
                    )}

                    {/* API Error */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm font-medium text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Welcome Message */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-slate-900">Welcome to Mathery!</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Join thousands of students mastering mathematics with AI-powered tutoring, interactive exercises, and personalized learning paths.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="h-14 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group"
                        disabled={loading || formData.password !== formData.confirmPassword}
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span>Join Mathery</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        )}
                    </Button>

                    <div className="text-center pt-4">
                        <p className="text-slate-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
