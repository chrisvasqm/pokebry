import { Transition, Variants } from 'framer-motion';

export const fadeUpTransition: Transition = { duration: 0.125, ease: 'easeOut' };

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8 },
    shown: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8, pointerEvents: 'none' }
};
