import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button, buttonVariants} from "@/components/ui/button";
import {BadgeInfo, PackageCheck, Star} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

type Props = {};
const HeroPopoverButtons = (props: Props) => {
    const isDeliveryDisabled = process.env.NEXT_PUBLIC_DELIVERY_ON === 'false';
    return (
        <div className={'mt-10 flex flex-wrap gap-5'}>
            {!isDeliveryDisabled && <Popover>
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
            </Popover>}

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
                                <Link href={''} className={'text-md font-bold'}>Москва,<br/> 1-я Магистральная улица,
                                    8с7</Link>
                            </Button>
                        </div>
                        <Separator/>
                        <div>
                            <span className={'text-muted-foreground'}>Телефон</span>
                            <p className={'text-md font-bold'}><a href="tel:+7 (964) 599-22-33">+7 (964) 599-22-33</a>
                            </p>
                        </div>
                         <Separator/>
                        <div>
                            <span className={'text-xs text-muted-foreground'}>Исполнитель (продавец):
                                ИП Маринин Артем Сергеевич, 101000, 101000, Москва,
                                Бескудниковский б-р, 8к3, ИНН 771376579641, рег. номер 322774600181922</span>

                        </div>
                    </div>
                </PopoverContent>


            </Popover>

        </div>
    );
};
export default HeroPopoverButtons;
