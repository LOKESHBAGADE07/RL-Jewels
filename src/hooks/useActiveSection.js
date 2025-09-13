import { useEffect, useState } from 'react';
/**
 * Tracks which section id is currently in view using IntersectionObserver.
 */
export function useActiveSection(sectionIds, offsetPx = 140) {
    const [active, setActive] = useState('');
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        }, {
            rootMargin: `-${offsetPx}px 0px -40% 0px`,
            threshold: [0, 0.25, 0.5, 0.75, 1],
        });
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el) => Boolean(el));
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sectionIds, offsetPx]);
    return active;
}
export default useActiveSection;
