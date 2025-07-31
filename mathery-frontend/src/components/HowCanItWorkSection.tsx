import {Brain, TrendingUp, Users} from "lucide-react";
import type React from "react";
import StepCard from "@/components/StepCard";


const HowCanItWorkSection = () => {
    return(
        <section className="px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        How Mathery{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Works
                </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                        Get started in minutes and begin your personalized mathematics learning journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StepCard
                        step="01"
                        title="Sign Up & Assess"
                        description="Create your account and take our quick assessment to determine your current math level and learning goals."
                        icon={<Users className="w-8 h-8" />}
                    />
                    <StepCard
                        step="02"
                        title="Learn with AI"
                        description="Start learning with our AI tutor that provides personalized explanations and adapts to your learning style."
                        icon={<Brain className="w-8 h-8" />}
                    />
                    <StepCard
                        step="03"
                        title="Practice & Progress"
                        description="Practice with interactive exercises and track your progress with detailed analytics and insights."
                        icon={<TrendingUp className="w-8 h-8" />}
                    />
                </div>
            </div>
        </section>
    )
}

export default HowCanItWorkSection;