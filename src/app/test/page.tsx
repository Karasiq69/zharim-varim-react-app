'use client'
import React, {useRef, useEffect} from 'react';
import {Link} from 'react-scroll';

interface NavItem {
    label: string;
    to: string;
}

const NavBar: React.FC = () => {
    const navItems: NavItem[] = [
        {label: 'Главная', to: 'home'},
        {label: 'О нас', to: 'about'},
        {label: 'Услуги', to: 'services'},
        {label: 'Контакты', to: 'contact'},
        {label: 'Блог', to: 'blog'},
    ];

    const navRef = useRef<HTMLUListElement>(null);

    useEffect(() => {

        const handleScroll = () => {
            const navElement = navRef.current;
            if (navElement) {
                const activeLink = navElement.querySelector('.active');
                console.log(activeLink)
                if (activeLink instanceof HTMLElement) {
                    navElement.scrollTo({
                        left: activeLink.offsetLeft,
                        behavior: 'smooth',
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
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
            <ul
                ref={navRef}
                className="flex space-x-16   px-6 py-5 overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory"
            >
                {navItems.map((item) => (
                    <li key={item.to} className="snap-center">
                        <Link
                            to={item.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            activeClass="active"
                            className="cursor-pointer"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const Section: React.FC<{ id: string; title: string }> = ({id, title}) => {
    return (
        <section id={id} className="h-screen flex items-center justify-center">
            <h2 className="text-4xl font-bold">{title}</h2>
        </section>
    );
};

const HomePage: React.FC = () => {
    return (
        <div>
            <NavBar/>
            <Section id="home" title="Главная"/>
            <Section id="about" title="О нас"/>
            <Section id="services" title="Услуги"/>
            <Section id="contact" title="Контакты"/>
            <Section id="blog" title="Блог"/>
        </div>
    );
};

export default HomePage;