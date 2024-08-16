import { useEffect, useState } from 'react';

import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { CreditCardMain, CreditCardSimpleItem } from '../../types';
import { useModal } from '../../hooks';
import { CreditCardDeleteDialog } from './CreditCardDeleteDialog';


interface Props {
    creditCard: CreditCardMain;
}

export const ExtensionsSimpleTable = ({ creditCard }: Props) => {
    const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();
    // const { deleteCreditCardById } = useWallet();
    // const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
    const [creditCards, setCreditCards] = useState<CreditCardSimpleItem[]>([]);
    const [selectedCard, setSelectedCard] = useState<CreditCardSimpleItem>();
    useEffect(() => {
        setCreditCards([creditCard, ...creditCard.extensions]);
    }, [creditCard]);

    const handleClickEdit = (creditCard: CreditCardSimpleItem) => {
        setSelectedCard(creditCard);
        // handleOpenModalForm();
    };
    const handleDelete = (creditCardId: number) => {
        console.log('delete',creditCardId)
        // deleteCreditCardById(creditCardId);
    };
    const handleConfirmDelete = (creditCard: CreditCardSimpleItem) => {
        setSelectedCard(creditCard);
        handleOpenDialogDelete();
    };
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Purchases</TableCell>
                    <TableCell>Subscriptions</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {creditCards.map((cc) => (
                    <TableRow key={cc.id}>
                        <TableCell>
                            {cc.alias} {cc.id === creditCard.id && '(main)'}
                        </TableCell>
                        <TableCell>{0}</TableCell>
                        <TableCell>{0}</TableCell>
                        <TableCell>
                            <ButtonGroup variant='contained' aria-label='Basic button group'>
                                <Button color='warning' onClick={() => handleClickEdit(cc)}>
                                    <Edit />
                                </Button>
                                <Button color='error' onClick={() => handleConfirmDelete(cc)}>
                                    <DeleteForever />
                                </Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                ))}
                <CreditCardDeleteDialog
                    handleClose={handleOpenDialogDelete}
                    open={openDialogDelete}
                    handleAgree={() => handleDelete(selectedCard!.id)}
                    creditCardName={selectedCard?.alias || 'no-card'}
                />
                {/* <CreditCardModal creditCard={selectedCard} open={openModalForm} handleOpen={handleOpenModalForm} /> */}
            </TableBody>
        </Table>
    );
};
