export interface CurrencyFormatOptions {
    symbol?: string;
    decimalSeparator?: string;
    thousandSeparator?: string;
}

export const formatCurrency = (
    amount: number,
    { symbol = '$', decimalSeparator = ',', thousandSeparator = '.' }: CurrencyFormatOptions = {}
): string => {
    const parts = amount.toFixed(2).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    return `${symbol} ${formattedIntegerPart}${decimalSeparator}${decimalPart}`;
};
