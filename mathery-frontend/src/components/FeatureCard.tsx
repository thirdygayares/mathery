import type React from "react";
import {Card, CardContent} from "@/components/ui/card";
import {CheckCircle} from "lucide-react";


const FeatureCard = ({
                         icon,
                         title,
                         description,
                         gradient,
                         features,
                     }: {
    icon: React.ReactNode
    title: string
    description: string
    gradient: string
    features: string[]
}) =>{
    return (
        <Card className="group p-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
                <div
                    className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default FeatureCard;