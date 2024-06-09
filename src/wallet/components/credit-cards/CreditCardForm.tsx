import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useWallet } from '../../../hooks';
import { CreditCard } from '../../api/interfaces';

interface Props {
    creditCard?: Partial<CreditCard>;
    afterSubmit?: () => void;
}

export const CreditCardForm = ({ creditCard, afterSubmit }: Props) => {
    const { register, handleSubmit, setValue } = useForm<CreditCard>({ defaultValues: creditCard });

    const isNew = !creditCard?.id;
    const { creditCards, createCreditCardMutation } = useWallet();

    const onSubmit = (data: CreditCard) => {
        try {
            if (!data.id) {
                createCreditCardMutation.mutate(data);
            } else {
                // TODO
                // updateMutation.mutate(data);
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
    if (creditCards === undefined) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                {/* mainCreditCar TODO: only for extensions */}
                <FormControl fullWidth>
                    <InputLabel htmlFor='main-credit-card-select'>Main CC</InputLabel>
                    <Select
                        id='main-credit-card-select'
                        onChange={handleSelectChange}
                        sx={{ mb: 2 }}
                        defaultValue={creditCard?.mainCreditCardId?.toString() || undefined}
                    >
                        <MenuItem>None</MenuItem>
                        {creditCards?.map((cc) => (
                            <MenuItem key={cc.id} value={cc.id}>
                                {cc.alias}
                            </MenuItem>
                        ))}
                    </Select>
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

                {/* nextExpiringDate */}
                <TextField type='date' fullWidth {...register('nextExpiringDate', { required: true })} sx={{ mb: 2 }} />

                <Button type='submit' color='primary' variant='outlined'>
                    {isNew ? 'Create' : 'Save'}
                </Button>
            </Box>
        </form>
    );
};
