import type { Metadata } from "next";
import {ReactNode} from "react";

import {Toaster} from "sonner";


export const metadata: Metadata = {
    title: "Mathery Register",
    description: "Mathery Register Dashboard",
}
interface RegisterLayoutProps {
    children: ReactNode;
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
    return (
            <div className="flex h-screen">
                <div className="flex flex-col flex-1">
                    {/* only the children scroll */}
                    <main className="flex-1 overflow-auto ">
                        <Toaster />
                        {children}
                    </main>
                </div>
            </div>
    );
}

export default RegisterLayout;