"use client";

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {KeyRound, LogOut, User} from "lucide-react";
import {ChangePasswordDialog} from "@/components/ChangePasswordDialog";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useLogout} from "@/hooks/useLogout";
import {usePathname} from "next/navigation";


const MenuDropdwon = () => {
    const { user } = useCurrentUser()
    const { logout, loading: logoutLoading } = useLogout()
    const pathname = usePathname()


    return(
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-9 w-9 rounded-full ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src={"/placeholder.svg"}
                                alt={user?.name || "User"}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <ChangePasswordDialog>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                            <KeyRound className="mr-2 h-4 w-4" />
                            <span>Change Password</span>
                        </DropdownMenuItem>
                    </ChangePasswordDialog>


                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={logout}
                        disabled={logoutLoading}
                        className="cursor-pointer text-destructive focus:text-destructive"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{logoutLoading ? "Signing out..." : "Sign out"}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )

}

export default MenuDropdwon