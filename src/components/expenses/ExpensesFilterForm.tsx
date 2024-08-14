import { Grid, MenuItem, TextField } from '@mui/material';
import { CreditCardSimpleItem, ExpenseTypeEnum } from '../../types';

interface Props {
    creditCards: CreditCardSimpleItem[];
    textFilter: string;
    creditCardId: number | undefined;
    expenseType: ExpenseTypeEnum | 'any';
    setTextFilter: (value: string) => void;
    setCreditCardId: (value: number | undefined) => void;
    setExpenseType: (value: ExpenseTypeEnum | 'any') => void;
}
export const ExpensesFilterForm = (props: Props) => {
    const { creditCards, textFilter, creditCardId, expenseType, setTextFilter, setCreditCardId, setExpenseType } = props;
    const defaultCreditCardId = creditCardId || 'any';
    const defaultExpenseType = expenseType || 'any';

    const onTextFilterChange = (text: string) => {
        setTextFilter(text);
    };
    const onCreditCardIdChange = (ccId: string) => {
        setCreditCardId(ccId === 'any' ? undefined : +ccId);
    };
    const onExpenseTypeChange = (expType: ExpenseTypeEnum | 'any') => {
        setExpenseType(expType);
    };
    return (
        <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
                <TextField
                    label='Filter'
                    fullWidth
                    variant='outlined'
                    value={textFilter}
                    onChange={(e) => onTextFilterChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    select
                    label='Creidt Card'
                    value={defaultCreditCardId}
                    fullWidth
                    onChange={(e) => onCreditCardIdChange(e.target.value)}
                >
                    <MenuItem value='any'>Any</MenuItem>
                    {creditCards.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.alias}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    select
                    label='Expense Type'
                    value={defaultExpenseType}
                    fullWidth
                    onChange={(e) => onExpenseTypeChange(e.target.value as ExpenseTypeEnum | 'any')}
                >
                    <MenuItem value='any'>Any</MenuItem>
                    <MenuItem value={ExpenseTypeEnum.PURCHASE}>Purchases</MenuItem>
                    <MenuItem value={ExpenseTypeEnum.SUBSCRIPTION}>Subscriptions</MenuItem>
                </TextField>
            </Grid>
        </Grid>
    );
};
