'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Perks from "@/components/Perks";
import {useProductsByCategory} from "@/api/queries";
import Image from "next/image";
import dynamic from "next/dynamic";
import StickyMenuNav from "@/components/StickyMenuNav";
import HeroPopoverButtons from "@/components/HeroPopoverButtons";


const MenuHome = dynamic(() => import('@/components/MenuHome'))

export default function Home() {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();


    return (
        <>
            <section id="hero" className="relative bg-cover bg-center bg-no-repeat">
                <Image
                    src="/herobg_v2.jpg"
                    alt="Hero Background"
                    quality={90}
                    fill
                    style={{objectFit: "cover", backgroundColor: '#fff', backgroundPosition: 'top'}}

                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <MaxWidthWrapper>

                    <div className={'py-40 flex flex-col text-white'}>
                        <h1 className={''}>Мы варим кофе <br/>
                            и жарим мясо.</h1>

                        <p className={'mt-5 max-w-xl  '}>
                            Уютное место, где вы можете не только перекусить свежими десертами и выпить свежеобжаренный
                            кофе, но и
                            побаловать себя свежим шашлыком и даже хачапури.
                        </p>

                        <HeroPopoverButtons/>
                    </div>

                </MaxWidthWrapper>
            </section>


            <StickyMenuNav data={data} isLoading={isLoading} isSuccess={isSuccess}/>


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

