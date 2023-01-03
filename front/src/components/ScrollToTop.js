import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearText } from '../slices/articleSlice';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const { searchedText } = useSelector((state) => state.article);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
            if (searchedText != '' && pathname != '/search') {
                dispatch(clearText());
            }
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
