import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    display: "swap",
});

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "GloryX | Dominate The Matrix",
    description: "Full-service digital marketing and automation. We don't just play the game. We rewrite the code.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${oswald.variable} ${roboto.variable}`}>
            <body className={`${roboto.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
