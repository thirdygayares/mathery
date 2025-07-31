import type React from "react";

const StepCard = ({
                      step,
                      title,
                      description,
                      icon,
                  }: {
    step: string
    title: string
    description: string
    icon: React.ReactNode
}) => {
        return (
            <div className="text-center group">
                <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {step}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{description}</p>
            </div>
        )
}

export default StepCard;