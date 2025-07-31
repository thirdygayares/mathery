"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { authEvent } from "@/lib/authEvent";

export interface DecodedToken {
    sub: string;
    exp: number;
    role: string[];
    name: string;
}

export const useCurrentUser = () => {
    const [user, setUser] = useState<DecodedToken | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUser = () => {
        const token = Cookies.get("token");

        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                const now = Math.floor(Date.now() / 1000);

                if (decoded.exp < now) {
                    Cookies.remove("token");
                    setUser(null);
                } else {
                    setUser(decoded);
                }
            } catch {
                Cookies.remove("token");
                setUser(null);

            }
        } else {
            setUser(null);
            window.location.replace("/");
        }

        setLoading(false);
    };

    useEffect(() => {
        loadUser(); // initial load

        const onChange = () => {
            setLoading(true);
            loadUser();
        };

        authEvent.addEventListener("login", onChange);
        authEvent.addEventListener("logout", onChange);

        return () => {
            authEvent.removeEventListener("login", onChange);
            authEvent.removeEventListener("logout", onChange);
        };
    }, []);

    return { user, loading };
};
