'use client'
import Link, {LinkProps} from "next/link";
import React, {PropsWithChildren} from "react";
import {Button} from "@/components/ui/button";

interface ScrollLinkProps {
    children: React.ReactNode;
    to: string;
    style?: React.CSSProperties;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({children, to, style}) => {
    const handleScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = to.replace(/.*#/, "");
        const elem = document.getElementById(targetId);
        if (elem) {
            window.scrollTo({
                top: window.scrollY + elem.getBoundingClientRect().top,
                behavior: "smooth",
            });
        }
    };

    return (
        <Button onClick={handleScroll} variant='link' style={style}>
            {children}
        </Button>
    );
};

export default ScrollLink;