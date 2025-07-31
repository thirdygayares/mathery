"use client"

import { UserRegisterForm } from "./components/UserRegisterForm"
import type React from "react";
import {AuthLayout} from "@/app/(auth)/components/AuthLayout";

export default function RegisterPage() {
    return (
        <AuthLayout type="register">
                    <UserRegisterForm />
        </AuthLayout>
    )
}
