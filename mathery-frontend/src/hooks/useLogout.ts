"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";

export const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const logout = async () => {
        try {
            setLoading(true)
            //remove token from cookies
            Cookies.remove("token")

            router.push("/")
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            setLoading(false)
        }
    }

    return { logout, loading }
}
