import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Blog Wizard App",
    description: "A professional blog wizard application.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
                <div className="relative flex min-h-screen flex-col">
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="px-10 flex h-16 items-center">
                            <Link href="/" className="mr-6 flex items-center space-x-2">
                                <span className="font-bold">Blog Wizard App Romie</span>
                            </Link>
                            <div className="flex flex-1 items-center justify-end space-x-2">
                                <Button asChild>
                                    <Link href="/create">Create Post</Link>
                                </Button>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 p-10">{children}</main>
                </div>
                <Toaster
                    position={"top-center"}
                    duration={2000}
                    closeButton={true}
                    toastOptions={{
                        classNames: {
                            toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                            description: "group-[.toast]:text-foreground/90",
                            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                        },
                    }}
                />
            </body>
        </html>
    );
}
