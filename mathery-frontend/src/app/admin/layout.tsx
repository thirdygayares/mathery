import type { Metadata } from "next";
import { ReactNode } from "react";

import SuperAdminGuard from "@/components/guard/SuperAdminGuard";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {Header} from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
    title: "Mathery",
    description: "Your math tutoring platform",
}

interface SuperAdminLayoutProps {
    children: ReactNode;
}

const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
    return (
        <SuperAdminGuard>
            <SidebarProvider>
                <div className="flex  w-full">
                    <Sidebar />
                    <SidebarInset className="flex flex-1 flex-col">
                        <Header />
                        <main className="flex-1 overflow-auto">
                            <div className="mx-auto max-w-7xl">
                                {children}
                            </div>
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </SuperAdminGuard>
    );
}

export default SuperAdminLayout;
