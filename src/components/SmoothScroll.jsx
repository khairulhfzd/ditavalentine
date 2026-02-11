import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

/**
 * SmoothScroll component using Lenis
 * Provides buttery smooth scrolling experience integrated with GSAP ScrollTrigger
 */
function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false, // Disable on touch devices for better performance
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert to milliseconds
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    // Handle reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = () => {
            if (lenisRef.current) {
                if (mediaQuery.matches) {
                    lenisRef.current.destroy();
                } else {
                    // Reinitialize if needed
                    window.location.reload();
                }
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Disable smooth scroll if reduced motion is preferred
        if (mediaQuery.matches && lenisRef.current) {
            lenisRef.current.destroy();
        }

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return <>{children}</>;
}

export default SmoothScroll;
