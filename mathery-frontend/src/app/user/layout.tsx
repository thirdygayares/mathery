import type { Metadata } from "next";
import { ReactNode } from "react";

import UserGuard from "@/components/guard/UserGuard";
import MenuDropdwon from "@/components/layout/MenuDropdwon";

export const metadata: Metadata = {
    title: "Mathery",
    description: "Your math tutoring platform",
}

interface UserLayoutProps {
    children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
    return (
        <UserGuard>

                    <div className="flex  w-full">
                            <main className="flex-1 overflow-auto">
                                <div className="mx-auto max-w-7xl">
                                    {children}
                                </div>
                            </main>
                    </div>
        </UserGuard>
    );
}

export default UserLayout;
