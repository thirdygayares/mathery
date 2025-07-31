"use client"

import { UserLoginForm } from "./components/UserLoginForm"
import type React from "react";
import {AuthLayout} from "@/app/(auth)/components/AuthLayout";

export default function LoginPage() {
    return (
        <AuthLayout type="login">
            <UserLoginForm />
        </AuthLayout>
    )
}
