'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Perks from "@/components/Perks";
import {useProductsByCategory} from "@/api/queries";
import Image from "next/image";
import dynamic from "next/dynamic";
import StickyMenuNav from "@/components/StickyMenuNav";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button, buttonVariants} from "@/components/ui/button";
import {BadgeInfo, BadgeInfoIcon, PackageCheck, Star, Truck} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";


const MenuHome = dynamic(() => import('@/components/MenuHome'))

export default function Home() {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();


    return (
        <>
            <section id="hero" className="relative bg-cover bg-center bg-no-repeat">
                <Image
                    src="/herobg.webp"
                    alt="Hero Background"
                    quality={70}
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

                        <div className={'mt-10 flex flex-wrap gap-5'}>

                            <Popover>
                                <PopoverTrigger>
                                    <Button asChild className={'py-7'} variant={"secondary"}>
                                        <div className={'flex'}>
                                            <PackageCheck className={'mr-3'}/>
                                            <div className={'text-left  '}>
                                                <div className={'text-xs text-muted-foreground'}>Доставляем от</div>
                                                <div className={'text-2xl font-bold'}>30-40 мин.</div>
                                            </div>
                                        </div>
                                    </Button>

                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className={'space-y-3'}>
                                        <div>
                                            <p className={'font-bold'}>Загруженность:</p>
                                            <p className={'text-yellow-500 font-bold'}>Средняя</p>
                                        </div>
                                        <div>
                                            <p className={'font-bold'}>Среднее время доставки:</p>
                                            <p className={'text-green-600'}>30-40 мин.</p>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger>
                                    <Button asChild className={'py-7'} variant={"secondary"}>
                                        <div className={'flex'}>
                                            <Star className={'mr-3'}/>
                                            <div className={'text-left  '}>
                                                <div className={'text-xs text-muted-foreground'}>56 оценок</div>
                                                <div className={'text-2xl font-bold'}>4.6</div>
                                            </div>

                                        </div>
                                    </Button>

                                </PopoverTrigger>
                                <PopoverContent>
                                    <p className={'font-bold'}>Рейтинг ресторана согласно статистике Яндекс.Еда</p>
                                    <Link className={cn(
                                        buttonVariants({variant: "link"}), 'pl-0'
                                    )} href={'https://eda.yandex.ru/moscow/r/varim_kofe_zarim_maso'}>Открыть
                                        Яндекс.Еда</Link>
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger>
                                    <Button asChild className={'py-7'} variant={"secondary"}>
                                        <div><BadgeInfo/></div>
                                    </Button>

                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className={'space-y-3'}>
                                        <div>
                                            <span className={'text-muted-foreground'}>Режим работы</span>
                                            <p className={'text-md font-bold'}>Ежедневно, с 10:00 до 22:00</p>
                                        </div>
                                        <Separator/>
                                        <div>
                                            <span className={'text-muted-foreground'}>Адрес</span>
                                            <Button asChild variant={'link'} className={'pl-0 underline hover:no-underline'}>
                                                <Link href={''} className={'text-md font-bold'}>Москва, 1-я Магистральная улица, 8с7</Link>
                                            </Button>
                                        </div>
                                        <Separator/>
                                        <div>
                                            <span className={'text-muted-foreground'}>Телефон</span>
                                            <p className={'text-md font-bold'}><a href="tel:+7 (964) 599-22-33">+7 (964) 599-22-33</a></p>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

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

