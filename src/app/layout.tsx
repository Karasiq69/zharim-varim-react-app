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
import {Suspense} from "react";
import Metrika from "@/components/Metrika";
import Script from 'next/script';

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
                <Script id="metrika-counter" strategy="afterInteractive">
                    {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
              ym(95662842, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`
                    }
                </Script>
                <Suspense fallback={<></>}>
                    <Metrika/>
                </Suspense>
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
