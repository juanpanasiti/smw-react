export const parseDateToShortString = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('es-ES', { month: 'short' });
    return `${day}-${month}`;
};

export const parseDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Asegura que el mes tenga 2 dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    return `${year}-${month}-${day}`;
};

export const parseDateFromString = (dateString: string): Date => {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
    }
    return parsedDate;
};
