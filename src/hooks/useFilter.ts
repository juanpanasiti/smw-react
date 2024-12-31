import { useEffect, useState } from 'react';

import { Filter } from '../types/forms';



export const useFilter = <T extends object>(originalList: T[]) => {
    const [filteredList, setFilteredList] = useState(originalList);
    const [filter, setFilter] = useState<Filter<T>>({
        text: '',
        fields: [],
        query: {},
    });

    useEffect(() => {
        const filtered = originalList.filter((item) => {
            const matchesQuery = Object.entries(filter.query).every(([key, value]) => item[key as keyof T] === value);

            if (!matchesQuery) {
                return false;
            }

            if (filter.text && filter.fields.length > 0) {
                const lowerCaseText = filter.text.toLowerCase();
                return filter.fields.some((field) => {
                    const fieldValue = String(item[field] || '').toLowerCase();
                    return fieldValue.includes(lowerCaseText);
                });
            }

            return true;
        });

        setFilteredList(filtered);
    }, [originalList, filter]);

    return {
        filteredList,
        filter,
        setFilter,
    };
};
