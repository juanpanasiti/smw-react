import { useState } from 'react';

export const useForm = <T>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);
    const [changedValues, setChangedValues] = useState<Partial<T>>({});

    const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
        setValues({
            ...values,
            [name]: value,
        });
        setChangedValues({
            ...changedValues,
            [name]: value,
        });
    };

    const reset = () => {
        setValues(initialValues);
        setChangedValues({});
    };

    return {
        values,
        changedValues,
        handleChange,
        reset,
    };
};
