"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { RoleType } from "@/types/role";

interface UserGuardProps {
    children: React.ReactNode;
}

export default function UserGuard({ children }: UserGuardProps) {
    const { loading, user } = useCurrentUser();
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (loading) return;
        if (!user) return;

        if (!user.role.includes(RoleType.USER)) {
            router.replace("/");
        } else {
            // Show children only when not redirecting
            setReady(true);
        }

    }, [user, loading, router]);

    // Don’t show anything while loading or redirecting
    if (loading || !ready) {
        return (
            <div className="min-h-screen flex items-center justify-center text-muted">
                Checking authorization...
            </div>
        );
    }

    return <>{children}</>;
}
