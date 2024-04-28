import type {Metadata} from "next";
import {
    Roboto
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {queryClient} from '@/lib/QueryProvider'
import {ShoppingCartProvider} from "@/app/context/ShoppingCartContext";
import Provider from '@/redux/provider'
import {Toaster} from "@/components/ui/toaster"
import Footer from "@/components/Footer";
import Setup from '@/components/utils/Setup';
import {Suspense} from "react";
import {Metrika} from "@/components/Metrika";

const mont = Roboto({subsets: ["latin", "cyrillic-ext", "cyrillic"], weight: ["300", "400", "500", "700"]});

export const metadata: Metadata = {
    title: "Варим кофе & Жарим мясо",
    description: "Уютное кафе в Москве, где можно вкусно поесть и выпить кофе. ",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning className={mont.className}>

        <QueryClientProvider client={queryClient}>
            <ShoppingCartProvider>
                <body className="relative flex flex-col min-h-svh pl-[calc(100vw - 100%)]">
                <Provider>
                    <Setup/>
                    <link rel="icon" href="/favicon100.png" type="image/x-icon" sizes="16x16"/>
                    <main className="relative flex flex-col flex-grow ">
                        <Navbar/>
                        <div className="flex-grow">{children}</div>
                        <ReactQueryDevtools initialIsOpen={false}/>
                        <Toaster/>
                    </main>
                    <Suspense>
                        <Metrika/>
                    </Suspense>
                    <Footer/>
                </Provider>
                </body>

            </ShoppingCartProvider>
        </QueryClientProvider>
        </html>

    );
}
