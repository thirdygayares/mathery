import FeatureCard from "@/components/FeatureCard";
import {BookOpen, Brain, MessageCircle, Shield, Target, TrendingUp} from "lucide-react";
import type React from "react";


const FeatureSection = () => {
    return (
        <section className="px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mathery?
                </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                        Our AI-powered platform revolutionizes mathematics learning with personalized tutoring, interactive
                        exercises, and comprehensive progress tracking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <FeatureCard
                        icon={<Brain className="w-8 h-8" />}
                        title="AI-Powered Tutoring"
                        description="Get personalized explanations and step-by-step solutions for any mathematical problem with our advanced AI tutor."
                        gradient="from-blue-500 to-blue-600"
                        features={["Instant problem solving", "Step-by-step explanations", "Personalized learning paths"]}
                    />
                    <FeatureCard
                        icon={<BookOpen className="w-8 h-8" />}
                        title="Interactive Exercises"
                        description="Practice with thousands of MCQ and image-based problems across all mathematical topics and difficulty levels."
                        gradient="from-indigo-500 to-indigo-600"
                        features={["10+ practice problems", "Multiple question types", "Adaptive difficulty"]}
                    />
                    <FeatureCard
                        icon={<TrendingUp className="w-8 h-8" />}
                        title="Progress Analytics"
                        description="Track your learning journey with detailed analytics, performance insights, and personalized recommendations."
                        gradient="from-purple-500 to-purple-600"
                        features={["Detailed progress reports", "Performance analytics", "Learning recommendations"]}
                    />
                    <FeatureCard
                        icon={<MessageCircle className="w-8 h-8" />}
                        title="24/7 AI Support"
                        description="Get instant help anytime with our AI tutor that's available around the clock to answer your questions."
                        gradient="from-emerald-500 to-emerald-600"
                        features={["Always available", "Instant responses", "Contextual help"]}
                    />
                    <FeatureCard
                        icon={<Target className="w-8 h-8" />}
                        title="Personalized Learning"
                        description="Adaptive learning system that adjusts to your pace and learning style for optimal results."
                        gradient="from-orange-500 to-orange-600"
                        features={["Adaptive curriculum", "Personal learning style", "Custom study plans"]}
                    />
                    <FeatureCard
                        icon={<Shield className="w-8 h-8" />}
                        title="Proven Results"
                        description="Join thousands of students who have improved their math skills with our scientifically-backed approach."
                        gradient="from-rose-500 to-rose-600"
                        features={["95% success rate", "Proven methodology", "Student testimonials"]}
                    />
                </div>
            </div>
        </section>
    )
}

export default FeatureSection