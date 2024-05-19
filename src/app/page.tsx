
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Perks from "@/components/Perks";
import Image from "next/image";
import HeroPopoverButtons from "@/components/HeroPopoverButtons";
import homepic1 from '../../public/images/homepic1.jpg'
import homepic2 from '../../public/images/homepic2.jpg'
import Products from "@/app/Products";



export default function Home() {
    return (
        <>
            <section id="hero" className="relative bg-cover bg-center bg-no-repeat">
                <Image
                    src="/herobg_v3.webp"
                    alt="Hero Background"
                    quality={80}
                    fill
                    placeholder={"blur"}
                    blurDataURL={'data:image/webp;base64,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'}
                    style={{objectFit: "cover", backgroundColor: '#fff', backgroundPosition: ''}}

                />
                <div className="absolute inset-0"></div>
                <MaxWidthWrapper>

                    <div className={'py-20 md:py-40 flex flex-col text-white'}>
                        <h1 className={'text-3xl md:text-5xl'}>Мы варим кофе <br/>
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
            <Products/>
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

