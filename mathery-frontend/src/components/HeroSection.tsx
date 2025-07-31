import {ArrowRight, Calculator, Play} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import type React from "react";


const HeroSection = () => {
    return(
        <section className="px-4 sm:px-6 py-12 sm:py-20">
            <div className="max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
                    <Calculator className="w-4 h-4" />
                    AI-Powered Mathematics Learning
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                    Master Math with{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Precision
              </span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-12">
                    Experience personalized mathematics learning with our advanced AI tutor. Get instant explanations,
                    practice with interactive exercises, and track your progress across all mathematical topics.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link href="/register">
                        <Button className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group">
                            <span>Start Learning Free</span>
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="w-full hidden sm:w-auto h-14 px-8 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-lg rounded-xl group bg-transparent"
                    >
                        <Play className="mr-2 h-5 w-5" />
                        Watch Demo
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-slate-900">10+</div>
                        <div className="text-sm text-slate-500">Active Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-slate-900">50+</div>
                        <div className="text-sm text-slate-500">Math Topics</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-slate-900">95%</div>
                        <div className="text-sm text-slate-500">Success Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-slate-900">24/7</div>
                        <div className="text-sm text-slate-500">AI Support</div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HeroSection;