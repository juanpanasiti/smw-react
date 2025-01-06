import { useEffect, useState } from 'react';

import { paginate } from '../helpers';

export const usePagination = <T>(originalList: T[] = [], pageLimit: number = 10) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const pages: T[][] = paginate<T>(originalList, pageLimit);

    useEffect(() => {
        setCurrentPageNumber(1);
    }, [originalList]);

    const goPage = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > pages.length) {
            return;
        }
        setCurrentPageNumber(pageNumber);
    };

    return {
        currentPage: pages[currentPageNumber - 1] || [],
        currentPageNumber,
        totalPages: pages.length,
        goPage,
    };
};
