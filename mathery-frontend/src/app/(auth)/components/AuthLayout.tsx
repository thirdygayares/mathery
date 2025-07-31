"use client"

import type React from "react"
import { Calculator, Brain, BookOpen, TrendingUp, Users, Award, Zap } from 'lucide-react'

interface AuthLayoutProps {
    children: React.ReactNode
    type: "login" | "register"
}

export function AuthLayout({ children, type }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-20 left-20 w-32 h-32 border border-blue-200 rounded-full"></div>
                <div className="absolute top-40 right-32 w-24 h-24 border border-indigo-200 rounded-full"></div>
                <div className="absolute bottom-32 left-40 w-40 h-40 border border-blue-200 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 border border-indigo-200 rounded-full"></div>

                {/* Mathematical symbols */}
                <div className="absolute top-32 left-1/4 text-6xl font-light text-blue-200">∑</div>
                <div className="absolute bottom-40 right-1/4 text-5xl font-light text-indigo-200">∫</div>
                <div className="absolute top-1/2 left-16 text-4xl font-light text-blue-200">π</div>
                <div className="absolute top-1/3 right-16 text-4xl font-light text-indigo-200">∞</div>
            </div>

            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <header className="w-full px-6 py-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Calculator className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Mathery
                                </h1>
                                <p className="text-xs text-slate-500 font-medium">AI Math Tutor</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Users className="w-4 h-4" />
                                <span>10+ Students</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Award className="w-4 h-4" />
                                <span>50+ Topics</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="px-4 md:px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">

                            {/* Left Side - Hero Content */}
                            <div className="space-y-8 lg:pr-8 hidden md:block ">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        <Zap className="w-4 h-4" />
                                        AI-Powered Learning
                                    </div>

                                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                                        Master{" "}
                                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Mathematics
                    </span>{" "}
                                        with AI
                                    </h2>

                                    <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                        Experience personalized learning with our advanced AI tutor. Get instant help,
                                        practice with interactive exercises, and track your progress.
                                    </p>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FeatureCard
                                        icon={<Brain className="w-6 h-6" />}
                                        title="AI Tutor"
                                        description="Get personalized explanations for any math problem"
                                        gradient="from-blue-500 to-blue-600"
                                    />
                                    <FeatureCard
                                        icon={<BookOpen className="w-6 h-6" />}
                                        title="Interactive Exercises"
                                        description="Practice with MCQ and visual problem sets"
                                        gradient="from-indigo-500 to-indigo-600"
                                    />
                                    <FeatureCard
                                        icon={<TrendingUp className="w-6 h-6" />}
                                        title="Progress Tracking"
                                        description="Monitor your learning with detailed analytics"
                                        gradient="from-purple-500 to-purple-600"
                                    />
                                    <FeatureCard
                                        icon={<Calculator className="w-6 h-6" />}
                                        title="All Levels"
                                        description="From basic arithmetic to advanced calculus"
                                        gradient="from-blue-600 to-indigo-600"
                                    />
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-8 pt-6 border-t border-slate-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">50+</div>
                                        <div className="text-sm text-slate-500">Modules</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">50+</div>
                                        <div className="text-sm text-slate-500">Topics</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">10+</div>
                                        <div className="text-sm text-slate-500">Exercises</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">95%</div>
                                        <div className="text-sm text-slate-500">Success Rate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="w-full max-w-md md:max-w-2xl">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function FeatureCard({
                         icon,
                         title,
                         description,
                         gradient
                     }: {
    icon: React.ReactNode
    title: string
    description: string
    gradient: string
}) {
    return (
        <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
    )
}
