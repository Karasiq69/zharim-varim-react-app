'use client'
import Container from "@/components/Container";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {MoveUp} from "lucide-react";
import AnchorMenu from "@/components/AnchorMenu";
import CartIcon from "@/components/CartIcon";
import {useCallback, useEffect, useState} from "react";
import {Category} from "@/types/types";

type Props = {
    data: Category[]
};
const StickyMenuNav = (props: Props) => {
    const isLoading = false
    const isSuccess = true

    const sections = isSuccess
        ? Array.from(new Set(props.data?.map(({slug, name}) => ({slug, name}))))
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
    );
};
export default StickyMenuNav;
