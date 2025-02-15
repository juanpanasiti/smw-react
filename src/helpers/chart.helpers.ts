import { Period } from '../types';
import { ChartState } from '../types/charts.types';
import { formatCurrency } from './currency.helpers';
// const COLORS: string[] = ['#E91E63', '#546E7A'];

export const getChartDefaultState = (): ChartState => {
    return {
        options: {
            chart: {
                id: '',
            },
            xaxis: {
                categories: [],
            },
        },
        series: [
            {
                name: '',
                data: [],
            },
        ],
    };
};
export const getChartStateFromPeriods = (periods: Period[]): ChartState => {
    const categories: string[] = periods.map((period) => period.id);
    const amounts: number[] = periods.map((period) => +period.payments.reduce((acc, payment) => acc + payment.amount, 0).toFixed(2))
    const maxAmount: number = nextMultipleOf(Math.max(...amounts) * 1.1);
    const series: ApexAxisChartSeries = [
        {
            name: 'Monto',
            data: amounts,
            type: 'area',
        },
    ];
    return {
        options: {
            chart: {
                id: 'future-estimated-expenses-chart',
            },
            xaxis: {
                categories,
                labels: {
                    style: {
                        colors: 'white',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'white',
                    },
                    formatter: (value) => `$${value.toFixed(2)}`,
                },
                max: maxAmount,
                forceNiceScale: true,
                stepSize: 200000,
            },
            dataLabels: {
                enabled: false,
            },
            // plotOptions: {
            //     line: {
            //         isSlopeChart: false,
            //         colors: {
            //             threshold: 1000000,
            //             colorAboveThreshold: 'red',
            //             colorBelowThreshold: 'green',
            //         }
            //     }
            // },
            markers: {
                size: [0],
                colors: undefined,
                strokeColors: undefined,
                strokeWidth: 1,
                strokeOpacity: 0.5,
                fillOpacity: 0.7,
                hover: {
                    size: 4,
                },
            },
            colors: undefined,
            annotations: {
                yaxis: [
                    {
                        y: 1000000,
                        borderColor: 'red',
                        label: {
                            text: 'Limite',
                            style: {
                                color: 'white',
                                background: 'red',
                            },
                        },
                    },
                ],
                // xaxis: categories.map(cat => ({
                //     x: cat,
                //     borderColor: 'blue',
                //     label: {
                //         text: cat,
                //         style: {
                //             color: 'white',
                //             background: 'blue',
                //         },
                //     },
                // }))
            },
            tooltip: {
                enabled: true,
                enabledOnSeries: [0],
                shared: true,
                intersect: false,
                theme: 'dark',
                style: {
                    fontSize: '12px',
                },
                // x: {
                //     show: true,
                //     format: 'dd MMM',
                //     formatter: (value: number, { seriesIndex, dataPointIndex, w }: any) => {
                //         return categories[dataPointIndex];
                //     },
                // },
                y: {
                    formatter: (value: number) => formatCurrency(value),
                },
            },
        },
        series,
    };
};

const nextMultipleOf = (amount: number, multiplier: number = 100000): number => {
    if (amount % multiplier === 0) {
        return amount + multiplier;
    }
    return Math.ceil(amount / multiplier) * multiplier;
};