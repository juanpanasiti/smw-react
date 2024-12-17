import { AddCircle } from '@mui/icons-material';
import styled from '@emotion/styled';
import { CreditCardContainer } from './CreditCardContainer';
import { CreditCardModalForm } from './CreditCardModalForm';
import { useState } from 'react';

export const AddCreditCardButton = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <CreditCardContainer>
            <AddButtonContainer onClick={() => setOpenModal(true)}>
                <AddIcon />
            </AddButtonContainer>
            {openModal && <CreditCardModalForm open={openModal} handleClose={() => setOpenModal(false)} />}
        </CreditCardContainer>
    );
};

const AddButtonContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover svg {
        color: #fff;
        transform: rotate(180deg);
    }
`;

const AddIcon = styled(AddCircle)`
    font-size: 5rem;
    color: #757575;
    transition: color 0.3s ease, transform 0.3s ease;
`;
