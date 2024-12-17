import { useState } from 'react';

export const useForm = <T>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);
    const [changedValues, setChangedValues] = useState<Partial<T>>({});

    const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
        setValues((prevValues) => {
            if (prevValues[name] !== value) {
                return {
                    ...prevValues,
                    [name]: value,
                };
            }
            return prevValues; // No hay cambios, no actualiza el estado
        });
    
        setChangedValues((prevChangedValues) => {
            if (prevChangedValues[name] !== value) {
                return {
                    ...prevChangedValues,
                    [name]: value,
                };
            }
            return prevChangedValues; // No hay cambios, no actualiza el estado
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
