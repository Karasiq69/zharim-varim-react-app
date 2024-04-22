import {useState, useEffect} from 'react';


export const useActiveSection = (sectionIds: string[]): string => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {threshold: 0.6});

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds]);


    return activeSection;
};
