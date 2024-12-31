import { Box, IconButton, Pagination as MuiPagination, PaginationItem } from '@mui/material';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';

interface Props {
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
}

const PaginationNav = ({ totalPages, currentPage, handlePageChange }: Props) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => handlePageChange(page)}
                siblingCount={1}
                boundaryCount={1}
                renderItem={(item) => (
                    <PaginationItemStyled
                        // component="button"
                        {...item}
                        disabled={totalPages === 0}
                    />
                )}
            />
            <IconButton
                disabled={currentPage === 1 || totalPages === 0}
                onClick={() => handlePageChange(1)}
                sx={{ marginLeft: 2 }}
            >
                <FirstPage />
            </IconButton>
            <IconButton
                disabled={currentPage === 1 || totalPages === 0}
                onClick={() => handlePageChange(currentPage - 1)}
                sx={{ marginLeft: 1 }}
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageChange(currentPage + 1)}
                sx={{ marginLeft: 1 }}
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageChange(totalPages)}
                sx={{ marginLeft: 1 }}
            >
                <LastPage />
            </IconButton>
        </Box>
    );
};

const PaginationItemStyled = styled(PaginationItem)`
    &.Mui-selected {
        background-color: #1976d2; /* Color de la página activa */
        color: white;
    }

    &:hover {
        background-color: #e3f2fd; /* Color al pasar el cursor */
    }

    &:disabled {
        opacity: 0.5;
    }
`;

export default PaginationNav;
