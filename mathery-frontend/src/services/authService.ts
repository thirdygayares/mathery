import axios from "@/lib/axios"
import { authEvent } from "@/lib/authEvent"
import Cookies from "js-cookie";
import {setTokenCookie} from "@/lib/authHelper";
import {RegisterData} from "@/app/(auth)/register/hooks/useRegister";


export const authService = {


    async userSignIn(email: string, password: string): Promise<string> {
        const res = await axios.post("/api/auth", { email, password })
        const token = res.data.access_token
        setTokenCookie(token)
        authEvent.dispatchEvent(new Event("login"))
        return token
    },

    async userRegister(data: RegisterData): Promise<string> {
        const res = await axios.post("/api/auth/user/register", data)
        const token = res.data.access_token
        setTokenCookie(token)
        authEvent.dispatchEvent(new Event("login"))
        return token
    },


    signOut() {
        Cookies.remove("token")
        authEvent.dispatchEvent(new Event("logout"))
    },
}
