// ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
    }, [pathname]); // Only re-run the effect if pathname changes

    return null; // This component doesn't render anything visible
};

export default ScrollToTop;
