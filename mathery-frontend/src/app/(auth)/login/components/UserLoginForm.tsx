"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, LogIn, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLogin } from "@/app/(auth)/login/hooks/useLogin"
import Link from "next/link"

export function UserLoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { userLogin, loading, error } = useLogin()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await userLogin(email, password)
    }

    return (
        <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
            <CardHeader className="space-y-6 pb-8 pt-10 px-8">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Welcome back
                        </CardTitle>
                        <CardDescription className="text-lg text-slate-600">
                            Continue your mathematics journey
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-14 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="password" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-14 pr-14 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 hover:bg-slate-100 rounded-lg"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-slate-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-slate-400" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-slate-900">Ready to learn?</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Access your personalized dashboard, continue AI conversations, and track your progress across all mathematics topics.
                                </p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm font-medium text-red-600">{error}</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="h-14 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span>Sign in to Mathery</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        )}
                    </Button>

                    <div className="text-center pt-4">
                        <p className="text-slate-600">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                            >
                                Join Mathery
                            </Link>
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
