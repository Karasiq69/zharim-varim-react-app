'use client'
import {CategoriesProps} from "@/types/types";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import ScrollLink from "@/components/ScrollLink";
import {useState} from "react";
import {useActiveSection} from '@/hooks/useActiveSection'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface Section {
    slug: string;
    name: string;
}

interface AnchorMenuProps {
    isLoading: boolean;
    sections: Section[];
}

const AnchorMenu: React.FC<AnchorMenuProps> = ({isLoading, sections}) => {
    const sectionSlugs = sections.map(section => section.slug);
    const activeSection = useActiveSection(sectionSlugs);

    return (
        <div>



            {/*TODO: Пофиксить мобилку*/}
            <div>
            {!isLoading && sections.map(({slug, name}) => (
                <ScrollLink
                    to={`#${slug}`}
                    key={slug}
                    style={{color: activeSection === slug ? 'green' : 'black'}}
                >
                    {name}
                </ScrollLink>
            ))}
                </div>
        </div>
    );
};

export default AnchorMenu;