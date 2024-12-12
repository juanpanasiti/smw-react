export const loadExpandMenu = (): boolean => {
    const expandMenu = localStorage.getItem('expandMenu');
    return expandMenu === 'true';
};

export const saveExpandMenu = (value: boolean) => {
    localStorage.setItem('expandMenu', value.toString());
};
