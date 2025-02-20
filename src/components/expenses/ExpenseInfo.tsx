import { Box, Divider, Stack, Typography } from '@mui/material';
import { CreditCard, Expense } from '../../types';
import { formatCurrency, parseDateToString } from '../../helpers';

interface Props {
    expense: Expense;
    creditCard: CreditCard
}

export const ExpenseInfo = ({ expense, creditCard }: Props) => {

    return (
        <Box>
            {/* Título Principal */}
            <Typography variant="h3" gutterBottom>
                {expense.title} <small> - {expense.ccName}</small>
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Contenedor de Información en Grid */}
            <Stack
                direction="row" 
                flexWrap="wrap" 
                // spacing={3} 
                // sx={{ justifyContent: 'space-between' }}
            >
                {[
                    { label: 'Tarjeta', value: creditCard.alias },
                    { label: 'Monto', value: `$${expense.amount.toFixed(2)}` },
                    { label: 'Fecha de adquisición', value: parseDateToString(expense.acquiredAt)},
                    { label: 'Tipo', value: expense.type },
                    { label: 'Cuotas', value: `${expense.installmentsPaid}/${expense.installments}` },
                    { label: 'Primera cuota', value: parseDateToString(expense.firstPaymentDate)},
                    { label: 'Estado', value: expense.status },
                    { label: 'Saldo restante', value: formatCurrency(expense.remainingAmount) },
                    { label: 'Total pagado', value: formatCurrency(expense.totalPaid) },
                ].map((item, index) => (
                    <Box 
                        key={index} 
                        sx={{
                            flex: '1 1 calc(33.333% - 32px)', // 3 columnas con espacio entre ellas
                            minWidth: 250, // Para que no se rompa en pantallas pequeñas
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            {item.label}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {item.value}
                        </Typography>
                    </Box>
                ))}
            </Stack>


        </Box>
    );
};
