export const parseCurrency = (amount: number): string => {
	return `$ ${amount.toFixed(2)}`;
};
