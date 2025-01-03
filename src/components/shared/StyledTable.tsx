import { TableCell, tableCellClasses, TableRow } from '@mui/material';
import { styled } from 'styled-components';

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#000',
        color: '#FFF',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(() => {
    return {
        '&:nth-of-type(odd)': {
            backgroundColor: '#222',
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    };
});
