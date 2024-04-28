import React from 'react';
import {Link} from 'react-scroll';

interface NavItem {
    label: string;
    to: string;
}

const NavBarTest: React.FC = () => {
    const navItems: NavItem[] = [
        {label: 'Главная', to: 'osnovnoe-menyu'},
        {label: 'О нас', to: 'hinkali'},
        {label: 'Услуги', to: 'zavtrak'},
        {label: 'Контакты', to: 'zakuski'},
        {label: 'Блог', to: 'osnovnoe-menyu'},
    ];

    return (
        <nav className="overflow-auto whitespace-nowrap">
            <ul className="flex space-x-4">
                {navItems.map((item) => (
                    <li key={item.to}>
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

export default NavBarTest;