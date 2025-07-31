"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/services/authService";
import {jwtDecode} from "jwt-decode";
import {RoleType} from "@/types/role";
import {DecodedToken} from "@/hooks/useCurrentUser";

export const useLogin = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const userLogin = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);

            const token = await authService.userSignIn(email, password);
            const user = jwtDecode<DecodedToken>(token);

            console.log(user);

            if (user.role.includes(RoleType.SUPERADMIN)) {
                router.push("/admin/module-management");
            }
            else if (user.role.includes(RoleType.USER)) {
                router.push("/user/home");
            } else {
                router.push("/");
            }
        } catch (err: any) {
            console.log(err);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };



    return { userLogin, loading, error };
};
