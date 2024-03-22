'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import Perks from "@/components/Perks";
import MenuHome from "@/components/MenuHome";
import AnchorMenu from "@/components/AnchorMenu";
import Container from "@/components/Container";
import {useProductsByCategory} from "@/api/queries";
import {useCallback, useEffect, useState} from "react";
import CartIcon from "@/components/CartIcon";
import Image from "next/image";
import {ChefHat, MoveUp} from "lucide-react";


export default function Home() {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();

    const sections = isSuccess
        ? Array.from(new Set(data?.map(({slug, name}) => ({slug, name}))))
        : [];


    const [isSticky, setSticky] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        setSticky(scrollTop >= 710);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setSticky(scrollTop >= 710);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <section id="hero" className="relative bg-cover bg-center bg-no-repeat">
                <Image
                    src="/herobg.webp"
                    alt="Hero Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
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
                            <Link href={'pagetsx'} className={buttonVariants()}> Построить маршрут</Link>
                        </div>
                    </div>

                </MaxWidthWrapper>
            </section>

            <section className={`bg-gray-200 sticky top-0 z-50 transition-all duration-200 overflow-x-auto   scroll-smooth 
                ${isSticky ? 'bg-white bg-opacity-80 backdrop-blur-2xl shadow-md' : ''}`}
            >
                <Container className={'flex items-center justify-between'}>
                    <div className={'flex items-center'}>
                        {isSticky && (
                            <div className={'  transition-transform duration-200 transform translate-x-1 '}>
                                {/*<Image width={'120'} height={60} src="/logoblack.svg" alt=""/>*/}
                                <Button asChild size={'icon'} variant={"ghost"}><Link
                                    href={'#'}><MoveUp/></Link></Button>
                            </div>
                        )}
                        <div
                            className={`py-4 transition-transform duration-200 transform ${isSticky ? 'translate-x-1' : 'translate-x-0'} `}>
                            <AnchorMenu isLoading={isLoading} sections={sections}/>
                        </div>
                    </div>
                    {isSticky && (
                        <div className={'transition-all duration-200 hidden lg:block'}>
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
        </>
    )
}

