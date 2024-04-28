'use client'

import {Link} from 'react-scroll';
import {Button} from '@/components/ui/button';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Category} from '@/types/types';
import {cn} from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CartSheet from "@/components/CartSheet";

type Props = {
    data: Category[];
    isLoading: boolean;
    isSuccess: boolean;
};

const StickyMenuNav = (props: Props) => {
    const sections = useMemo(() => {
        if (!props.isSuccess) return [];
        return Array.from(new Set(props.data?.map(({slug, name}) => ({slug, name}))));
    }, [props.isSuccess, props.data]);

    const [isSticky, setSticky] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setSticky(scrollTop >= 710);

            const navElement = navRef.current;
            if (navElement) {
                const activeLink = navElement.querySelector('.text-green-600');
                if (activeLink instanceof HTMLElement) {
                    activeLink.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center',
                    });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <section
            className={cn(
                'sticky  top-0 z-50 transition-all duration-200 overflow-x-auto scroll-smooth',
                {
                    'bg-white bg-opacity-75 backdrop-blur-2xl shadow-md': isSticky,
                }
            )}
        >
            <MaxWidthWrapper>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div
                            className={cn(
                                '  transition-transform duration-200 overflow-x-auto whitespace-nowrap',
                                {
                                    'translate-x-1': isSticky,
                                    'translate-x-0': !isSticky,
                                }
                            )}
                        >
                            <div className=" ">
                                <div
                                    className="flex  overflow-x-auto whitespace-nowrap scroll-smooth  gap-2"
                                    ref={navRef}
                                >
                                    {!props.isLoading &&
                                        sections?.map(({slug, name}) => (
                                            <Button key={slug} asChild variant='ghost'
                                                    className={'hover:bg-gray-100  cursor-pointer'}>
                                                <Link
                                                    to={slug}
                                                    smooth={true}
                                                    duration={500}
                                                    offset={-100}
                                                    activeClass="text-green-600"
                                                    spy={true}
                                                >
                                                    {name}
                                                </Link>
                                            </Button>
                                        ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    {isSticky && (
                        <div className="transition-all duration-200 hidden lg:block">
                            <CartSheet/>
                        </div>
                    )}
                </div>
            </MaxWidthWrapper>
        </section>
    );
};

export default StickyMenuNav;