export const paginate = <T>(list: T[], limit: number = 10): T[][] => {
    const result = [];
    for (let i = 0; i < list.length; i += limit) {
        result.push(list.slice(i, i + limit));
    }
    return result;
};
