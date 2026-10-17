import { Transition } from 'framer-motion';

export const fadeUpTransition: Transition = { duration: 0.125, ease: 'easeOut' };
export const fadeUpHidden = { opacity: 0, y: 8 };
export const fadeUpShown = { opacity: 1, y: 0 };
