"use client"

import type React from "react"

import {
  ArrowRight,
  Calculator,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import FeatureCard from "@/components/FeatureCard"
import FeatureSection from "@/components/FeatureSection";
import HowCanItWorkSection from "@/components/HowCanItWorkSection";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
        {/* Background Pattern */}

        <div className="relative z-10">
          {/* Header */}
          <header className="w-full px-4 sm:px-6 py-4 sm:py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Mathery
                  </h1>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">AI Math Tutor</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <HeroSection/>
          {/* Features Section */}
          <FeatureSection/>

          {/* How It Works Section */}
          <HowCanItWorkSection/>

          {/* CTA Section */}
          <section className="px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Master Mathematics?</h2>
              <p className="text-lg sm:text-xl mb-12 opacity-90">
                Join thousands of students who are already improving their math skills with Mathery's AI-powered learning
                platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/register">
                  <Button className="w-full sm:w-auto h-14 px-8 bg-white text-blue-600 hover:bg-gray-50 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <span>Start Learning Free</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                      variant="outline"
                      className="w-full sm:w-auto h-14 px-8 border-2 border-white/20 text-white hover:bg-white/10 font-semibold text-lg rounded-xl bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              <p className="text-sm opacity-75">No credit card required • Free forever • Cancel anytime</p>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-4 sm:px-6 py-12 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Mathery</h3>
                    <p className="text-sm text-slate-400">AI Math Tutor</p>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-slate-400 text-sm">© 2025 Mathery. All rights reserved.</p>
                  <p className="text-slate-500 text-xs mt-1">Empowering students with AI-powered</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
  )
}




