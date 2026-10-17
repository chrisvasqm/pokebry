import { motion, Variants } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { fadeUpHidden, fadeUpShown, fadeUpTransition } from './motion';

const variants: Variants = {
    initial: fadeUpHidden,
    animate: fadeUpShown,
    exit: { opacity: 0, y: -8, pointerEvents: 'none' }
};

const PageTransition = ({ children }: PropsWithChildren) => {
    return (
        <motion.div
            id='page-transition'
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={fadeUpTransition}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition;
