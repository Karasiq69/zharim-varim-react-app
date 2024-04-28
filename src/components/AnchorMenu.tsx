'use client'
import ScrollLink from "@/components/ScrollLink";
import {useActiveSection} from '@/hooks/useActiveSection'
import {Button} from "@/components/ui/button";
import React from "react";

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
        <div className="max-w-max">
            <div className="flex">
                {!isLoading && sections?.map(({slug, name}) => (
                    <Button key={slug} asChild variant='ghost' className={'hover:bg-gray-200 '}>
                        <ScrollLink
                            to={`#${slug}`}
                            key={slug}
                            style={{color: activeSection === slug ? 'green  ' : 'black'}}
                        >


                            ыуч{name}ss!


                        </ScrollLink>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default AnchorMenu;