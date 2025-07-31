"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService"
import { toast } from "sonner"

export interface RegisterData {
    email: string
    password: string
    first_name: string
    last_name: string
}

export const useRegister = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const userRegister = async (data: RegisterData) => {
        try {
            setError(null)
            setLoading(true)

            const token = await authService.userRegister(data)

            toast.success("Account created successfully! Welcome to Mathery Rewards!", {
                description: "You can now start earning points from participating merchants.",
                duration: 5000,
            })

            router.push("/user/home")
        } catch (err: any) {
            console.log(err)
            const errorMessage = err.response?.data?.detail || "Registration failed. Please try again."
            setError(errorMessage)

            toast.error("Registration Failed", {
                description: errorMessage,
                duration: 4000,
            })
        } finally {
            setLoading(false)
        }
    }

    return {
        userRegister,
        loading,
        error,
    }
}
