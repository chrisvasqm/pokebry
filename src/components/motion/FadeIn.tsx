import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { fadeUpHidden, fadeUpShown, fadeUpTransition } from './motion';

interface Props {
    /** When false the content stays in its hidden state and animates in once it becomes true. */
    isVisible?: boolean
}

const FadeIn = ({ children, isVisible = true }: PropsWithChildren<Props>) => {
    return (
        <motion.div
            initial={fadeUpHidden}
            animate={isVisible ? fadeUpShown : fadeUpHidden}
            transition={fadeUpTransition}
        >
            {children}
        </motion.div>
    )
}

export default FadeIn;
