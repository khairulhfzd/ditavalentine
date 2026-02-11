import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapConfig';

/**
 * Custom hook for GSAP animations with automatic cleanup
 * @param {Function} animationCallback - Function containing GSAP animations
 * @param {Array} dependencies - Dependency array for useEffect
 * @returns {Object} - Ref object for the container element
 */
export const useGSAPAnimation = (animationCallback, dependencies = []) => {
    const containerRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        // Create GSAP context for automatic cleanup
        const ctx = gsap.context(() => {
            if (containerRef.current) {
                animationCallback(containerRef.current);
            }
        }, containerRef);

        contextRef.current = ctx;

        // Cleanup on unmount
        return () => ctx.revert();
    }, dependencies);

    return containerRef;
};

/**
 * Hook for scroll-triggered animations
 * @param {Function} animationCallback - Function to run for scroll animations
 * @param {Array} dependencies - Dependency array
 * @returns {Object} - Ref object for the trigger element
 */
export const useScrollTrigger = (animationCallback, dependencies = []) => {
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!triggerRef.current) return;

        const ctx = gsap.context(() => {
            animationCallback(triggerRef.current);
        }, triggerRef);

        return () => ctx.revert();
    }, dependencies);

    return triggerRef;
};

export default useGSAPAnimation;
