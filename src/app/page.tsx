'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import Perks from "@/components/Perks";
// import MenuHome from "@/components/MenuHome";
import AnchorMenu from "@/components/AnchorMenu";
import Container from "@/components/Container";
import {useProductsByCategory} from "@/api/queries";
import CartIcon from "@/components/CartIcon";
import Image from "next/image";
import {ChefHat, MoveUp, Split} from "lucide-react";
import dynamic from "next/dynamic";
import StickyMenuNav from "@/components/StickyMenuNav";

const MenuHome = dynamic(()=>import('@/components/MenuHome'))

export default function Home() {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();

    return (
        <>
            <section id="hero" className="relative bg-cover bg-center bg-no-repeat">
                <Image
                    src="/herobg.webp"
                    alt="Hero Background"
                    quality={100}
                    fill
                    style={{objectFit: "cover"}}

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

                        <div className={'mt-5'}><Button asChild variant={'default'}>
                            <Link target={'_blank'} href={'https://yandex.ru/maps/-/CDRQ7A1W'}
                                  className={buttonVariants()}>
                                Построить маршрут <Split size={14} className={'ml-2'}/></Link>
                        </Button>

                        </div>
                    </div>

                </MaxWidthWrapper>
            </section>

            <StickyMenuNav data={data}/>
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

