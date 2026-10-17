import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface Props {
    delay?: number
}

const FadeIn = ({ children, delay = 0 }: PropsWithChildren<Props>) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut', delay }}
        >
            {children}
        </motion.div>
    )
}

export default FadeIn;
