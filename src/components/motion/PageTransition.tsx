import { motion, Variants } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { fadeUp, fadeUpTransition } from './fadeUp';

/** Route wrapper: fades up on enter and, inside an AnimatePresence, fades out ignoring clicks while leaving. */
const pageVariants: Variants = {
    ...fadeUp,
    exit: { opacity: 0, y: -8, pointerEvents: 'none' }
};

const PageTransition = ({ children }: PropsWithChildren) => {
    return (
        <motion.div
            id='page-transition'
            variants={pageVariants}
            initial='hidden'
            animate='shown'
            exit='exit'
            transition={fadeUpTransition}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition;
