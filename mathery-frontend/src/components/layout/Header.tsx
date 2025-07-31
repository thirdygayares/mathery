"use client"


import { useLogout } from "@/hooks/useLogout"
import {  usePathname } from "next/navigation"
import { ChangePasswordDialog } from "../ChangePasswordDialog"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {useCurrentUser} from "@/hooks/useCurrentUser";
import MenuDropdwon from "@/components/layout/MenuDropdwon";

export const Header = () => {



    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-extrabold tracking-tight text-foreground">MATHERY</h1>
                </div>
            </div>

            <MenuDropdwon/>

        </header>
    )
}
