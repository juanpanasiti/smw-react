import { Typography } from '@mui/material';
import { useStore } from '../../store';

export const HomePage = () => {
    const store = useStore();
    return (
        <>
            <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, perspiciatis accusamus quas dolorem modi illo quia at deserunt
                blanditiis consequatur tempora impedit atque? Fuga, modi! Dignissimos dicta ipsum ipsam numquam?
            </Typography>
            <pre>{JSON.stringify(store, null, 3)}</pre>
        </>
    );
};
