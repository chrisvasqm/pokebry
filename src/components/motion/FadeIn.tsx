import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { fadeUp, fadeUpTransition } from './fadeUp';

interface Props {
    id?: string
    /** When false the content stays hidden and animates in once it becomes true. */
    isVisible?: boolean
}

const FadeIn = ({ children, id, isVisible = true }: PropsWithChildren<Props>) => {
    return (
        <motion.div
            id={id}
            variants={fadeUp}
            initial='hidden'
            animate={isVisible ? 'shown' : 'hidden'}
            transition={fadeUpTransition}
        >
            {children}
        </motion.div>
    )
}

export default FadeIn;
