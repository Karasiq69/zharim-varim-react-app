import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const inter = Inter({subsets: ["latin", "cyrillic-ext", "cyrillic"]});
import {queryClient} from '@/lib/QueryProvider'
import {ShoppingCartProvider} from "@/app/context/ShoppingCartContext";
import Provider from '@/redux/provider'
import {Toaster} from "@/components/ui/toaster"
import Footer from "@/components/Footer";
import Setup from '@/components/utils/Setup';

export const metadata: Metadata = {
    title: "Жарим Варим",
    description: "Мы варим кофе и жарим мясо",

};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>

        <QueryClientProvider client={queryClient}>
            <ShoppingCartProvider>
                <body className="relative flex flex-col min-h-svh">

                <Provider>
                    <Setup/>
                    <link rel="icon" href="/favicon100.png" type="image/x-icon" sizes="16x16"/>
                    <main className="relative flex flex-col flex-grow">
                        <Navbar/>
                        <div className="flex-grow">{children}</div>
                        <ReactQueryDevtools initialIsOpen={false}/>
                        <Toaster/>
                    </main>

                    <Footer/>
                </Provider>

                </body>

            </ShoppingCartProvider>
        </QueryClientProvider>
        </html>

    );
}
