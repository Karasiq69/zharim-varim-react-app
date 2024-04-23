'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Perks from "@/components/Perks";
import {useProductsByCategory} from "@/api/queries";
import Image from "next/image";
import dynamic from "next/dynamic";
import StickyMenuNav from "@/components/StickyMenuNav";
import HeroPopoverButtons from "@/components/HeroPopoverButtons";
import placeholderImage from "../../public/placeholder.webp";
import homepic1 from '../../public/images/homepic1.jpg'
import homepic2 from '../../public/images/homepic2.jpg'

const MenuHome = dynamic(() => import('@/components/MenuHome'))

export default function Home() {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();


    return (
        <>
            <section id="hero" className="relative bg-cover bg-center bg-no-repeat">
                <Image
                    src="/herobg_v3.webp"
                    alt="Hero Background"
                    quality={100}
                    fill
                    style={{objectFit: "cover", backgroundColor: '#fff', backgroundPosition: ''}}

                />
                <div className="absolute inset-0"></div>
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
                    <div className={'my-20'}>
                        <p className={'text-sm text-muted-foreground'}>
                            Добро пожаловать в наше уютное кафе в центре Москвы! Мы рады предложить вам широкий выбор
                            блюд
                            кавказской и европейской кухни. Наша особенность - свежеобжаренный ароматный кофе и сочное
                            мясо,
                            приготовленное на мангале. Попробуйте наши фирменные блюда: ароматный шашлык, сочный кебаб в
                            лаваше и аппетитную шаурму с разными начинками.
                            В нашем меню вы также найдете завтраки, закуски, салаты, супы, горячие блюда и десерты.
                            Любимые
                            многими хачапури, хинкали и долма не оставят вас равнодушными. А наши домашние лимонады,
                            морсы и
                            глинтвейны отлично дополнят трапезу.
                            Проводите время с семьей и друзьями в приятной атмосфере нашего кафе. Мы предлагаем доставку
                            блюд из нашего меню, чтобы вы могли насладиться ими, не выходя из дома или офиса. Закажите
                            онлайн или по телефону - и наши вкусные блюда будут у вас в кратчайшие сроки.
                            Посетите наше кафе в центре Москвы, где ароматный свежеобжаренный кофе и сочный шашлык с
                            мангала
                            создают уютную атмосферу. Мы всегда рады видеть вас в нашем заведении и побаловать
                            разнообразными блюдами кавказской и европейской кухни. До встречи в нашем кафе!
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                 src={homepic1} alt="" width={600}/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                 src={homepic2} alt="" width={600}/>
                        </div>

                    </div>
                </MaxWidthWrapper>
            </section>

        </>
    )
}

