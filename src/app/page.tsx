'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import Perks from "@/components/Perks";
import MenuHome from "@/components/MenuHome";
import AnchorMenu from "@/components/AnchorMenu";
import Container from "@/components/Container";
import {useProductsByCategory} from "@/api/queries";
import {useEffect, useState} from "react";
import CartIcon from "@/components/CartIcon";


export default function Home() {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();

    const sections = isSuccess
        ? Array.from(new Set(data.map(({slug, name}) => ({slug, name}))))
        : [];


    const [isSticky, setSticky] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setSticky(scrollTop >= 710);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <section id="hero" style={{backgroundImage: "url('/herobg.webp')"}}
                     className={"relative  bg-cover bg-center bg-no-repeat "}>
                <div className="absolute inset-0 bg-stone-800 bg-opacity-50"></div>
                <MaxWidthWrapper>

                    <div className={'py-40 flex flex-col text-white'}>
                        <h1 className={' '}>Мы варим кофе <br/>
                            и жарим мясо.</h1>

                        <p className={'mt-5 max-w-xl  '}>
                            Уютное место, где вы можете не только перекусить свежими десертами и выпить свежеобжаренный
                            кофе, но и
                            побаловать себя свежим шашлыком и даже хачапури.
                        </p>

                        <div className={'mt-5'}>
                            <Link href={'google.com'} className={buttonVariants()}> Построить маршрут</Link>
                        </div>
                    </div>

                </MaxWidthWrapper>
            </section>

            <section
                className={`bg-gray-200 sticky top-0 z-50 transition-all duration-200 ${isSticky ? 'bg-white bg-opacity-80 backdrop-blur-2xl shadow-md' : ''}`}>
                <Container className={'flex items-center justify-between'}>
                    <div className={'flex items-center'}>
                        {isSticky && (
                            <div className={'transition-transform duration-200 transform translate-x-0 '}>
                                <img width={120} height={60} src="http://localhost:3000/logoblack.svg"  alt=""/>
                            </div>
                        )}
                        <div
                            className={` p-2 transition-transform duration-200 transform ${isSticky ? 'translate-x-5' : 'translate-x-0'}`}>
                            <AnchorMenu isLoading={isLoading} sections={sections}/>
                        </div>
                    </div>

                    {isSticky && (
                        <div className={'transition-all duration-200'}>
                            <CartIcon/>
                        </div>
                    )}
                </Container>

            </section>

            <section className={'py-10 bg-gray-200'}>
                <MaxWidthWrapper>
                    <MenuHome data={data} isLoading={isLoading} isSuccess={isSuccess}/>
                </MaxWidthWrapper>
            </section>

            <section className={'py-20 my-10'}>
                <MaxWidthWrapper>
                    <Perks/>
                </MaxWidthWrapper>
            </section>
            <section id="section2" className={'py-20 my-10'}>
                <MaxWidthWrapper>
                    <div className={'mx-auto p-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4  '}>
                        <div className={'  bg-emerald-100'}>
                            <h3>sex</h3>
                            <p>asdsddasjkhadslkj dasljdas das lhkdas kladsklhjadhksjl</p>

                        </div>
                        <div className={'  bg-emerald-100'}>
                            <h3>sex</h3>
                            <p>asdsddasjkhadslkj dasljdas das lhkdas kladsklhjadhksjl</p>
                            <p>asdsddasjkhadslkj dasljdas das lhkdas kladsklhjadhksjl</p>
                            <p>asdsddasjkhadslkj dasljdas das lhkdas kladsklhjadhksjl</p>

                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

        </>
    )
}

