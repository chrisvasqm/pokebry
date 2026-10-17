import { PropsWithChildren } from 'react';
import FadeIn from './FadeIn';

const PageTransition = ({ children }: PropsWithChildren) => {
    return <FadeIn id='page-transition' animateExit>{children}</FadeIn>
}

export default PageTransition;
