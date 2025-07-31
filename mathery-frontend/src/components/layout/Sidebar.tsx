"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Users,
    Trophy, Book,

} from "lucide-react"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { RoleType } from "@/types/role"
import {
    Sidebar as SidebarPrimitive,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

interface NavItem {
    name: string
    href: string
    Icon: React.ComponentType<{ className?: string }>
    description?: string
}

interface Section {
    title: string
    role: string[]
    restricted?: string[]
    items: NavItem[]
}

const sections: Section[] = [

    {
        title: "Management",
        role: [RoleType.SUPERADMIN],
        items: [
            { name: "Module Management", href: "/admin/module-management", Icon: Book },
            { name: "Student Management", href: "/admin/student-management", Icon: Users },
            { name: "Exercise Management", href: "/admin/exercise-management", Icon: Trophy },

        ],
    },

]

const Sidebar = () => {
    const { user, loading } = useCurrentUser()
    const pathname = usePathname()

    if (loading || !user) return null

    const userrole = new Set(user.role)

    return (
        <SidebarPrimitive variant="inset" className="border-r-0">
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center gap-2 px-4 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Book className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Mathery</span>
                        <span className="text-xs text-muted-foreground"></span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="gap-0">
                {sections.map((section) => {
                    // Skip if user has none of the role for this section
                    if (!section.role.some((role) => userrole.has(role))) return null


                    // Skip if the user has any of the restricted role
                    if (section.restricted?.some((role) => userrole.has(role))) return null

                    return (
                        <SidebarGroup key={section.title} className="px-0">
                            <SidebarGroupLabel className="px-4 text-xs font-medium text-gray-600">
                                {section.title}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton asChild isActive={isActive} className="px-4">
                                                    <Link href={item.href} className="flex items-center gap-3">
                                                        <item.Icon className="h-4 w-4 shrink-0 text-primary" />
                                                        <div className="flex flex-col gap-0.5 overflow-hidden">
                                                            <span className="truncate text-xs font-medium">{item.name}</span>
                                                            {item.description && (
                                                                <span className="truncate text-xs text-muted-foreground">{item.description}</span>
                                                            )}
                                                        </div>
                                                        {isActive && (
                                                            <Badge variant="default" className="ml-auto h-5 px-1.5 text-xs">
                                                                Active
                                                            </Badge>
                                                        )}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                })}
            </SidebarContent>
            <SidebarRail />
        </SidebarPrimitive>
    )
}

export default Sidebar
