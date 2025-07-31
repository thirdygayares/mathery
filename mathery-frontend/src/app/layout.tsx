import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik_Bubbles, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const roboto = Rubik_Bubbles({
    weight: ["400"],
    subsets: ["latin"],
});


const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Mathery - Your AI Math Tutor",
    description:
        "Mathery is your AI math tutor, helping you understand and solve math problems with ease.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${montserrat.variable}    {/* include Montserrat */}
          antialiased
        `}
        >
        {children}
        </body>
        </html>
    );
}
