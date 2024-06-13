import { Box, Button, FormControl, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useWallet } from '../../../hooks';
import { CreditCard } from '../../api/interfaces';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

interface Props {
    creditCard?: Partial<CreditCard>;
    afterSubmit?: () => void;
}
const DATE_FORMAT = 'DD-MM-YYYY';

export const CreditCardForm = ({ creditCard, afterSubmit }: Props) => {
    const { register, handleSubmit, setValue } = useForm<CreditCard>({ defaultValues: creditCard });

    const isNew = !creditCard?.id;
    const { creditCards, createCreditCardMutation, updateCreditCardMutation } = useWallet();

    const onSubmit = (data: CreditCard) => {
        try {
            if (!data.id) {
                createCreditCardMutation.mutate(data);
            } else {
                updateCreditCardMutation.mutate(data);
            }
            afterSubmit && afterSubmit();
        } catch (error) {
            console.error(error);
        }
    };
    const handleSelectChange = ({ target }: SelectChangeEvent) => {
        setValue('mainCreditCardId', +target.value);
        const selected = creditCards?.find((cc) => cc.id === +target.value);
        if (selected === undefined) return;
        setValue('limit', selected.limit);
        setValue('nextClosingDate', selected.nextClosingDate);
        setValue('nextExpiringDate', selected.nextExpiringDate);
    };
    const handleChangeDate = (date: string, field: 'nextExpiringDate' | 'nextClosingDate') => {
        setValue(field, date);
    };
    if (creditCards === undefined) return <div>Loading...</div>;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                {/* mainCreditCar TODO: only for extensions */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        select
                        label='Main Creidt Card'
                        defaultValue={creditCard?.mainCreditCardId?.toString() || undefined}
                        fullWidth
                        onChange={(e) => handleSelectChange(e as SelectChangeEvent)}
                    >
                        {creditCards?.map((cc) => (
                            <MenuItem key={cc.id} value={cc.id}>
                                {cc.alias}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                {/* name */}
                <TextField
                    label='Name'
                    type='text'
                    placeholder='Ej: VISA - ####'
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register('alias', { required: true })}
                />

                {/* limit */}
                <TextField label='Buy Limit' type='number' fullWidth sx={{ mb: 2 }} {...register('limit', { required: true, valueAsNumber: true })} />

                {/* nextClosingDate */}
                <TextField type='date' fullWidth {...register('nextClosingDate', { required: true, min: Date() })} sx={{ mb: 2 }} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <DatePicker
                        label='Next Closing Date'
                        defaultValue={moment(creditCard?.nextClosingDate)}
                        onChange={(date) => handleChangeDate(date?.format('YYYY-MM-DD') || '', 'nextClosingDate')}
                        format={DATE_FORMAT}
                    />
                </FormControl>

                {/* nextExpiringDate */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <DatePicker
                        label='Next Expiring Date'
                        defaultValue={moment(creditCard?.nextExpiringDate)}
                        onChange={(date) => handleChangeDate(date?.format('YYYY-MM-DD') || '', 'nextExpiringDate')}
                        format={DATE_FORMAT}
                    />
                </FormControl>

                <Button type='submit' color='primary' variant='outlined'>
                    {isNew ? 'Create' : 'Save'}
                </Button>
            </Box>
        </form>
    );
};
