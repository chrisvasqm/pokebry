import { motion, Variants } from 'framer-motion';
import { PropsWithChildren } from 'react';

const variants: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 }
};

const PageTransition = ({ children }: PropsWithChildren) => {
    return (
        <motion.div
            id='page-transition'
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition;
