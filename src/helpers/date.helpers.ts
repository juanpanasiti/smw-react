export const parseDateToShortString = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('es-ES', { month: 'short' });
    return `${day}-${month}`;
};

export const parseDateFromString = (dateString: string): Date => {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
    }
    return parsedDate;
};
