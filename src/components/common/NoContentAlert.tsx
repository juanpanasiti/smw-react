import { Alert, AlertTitle } from '@mui/material';

interface Props {
    title?: string;
    message?: string;
}
const DEFAULT_TITLE = 'Nothing to show';
const DEFAULT_MESSAGE = 'There are no content to show!';

export const NoContentAlert = ({ title = DEFAULT_TITLE, message = DEFAULT_MESSAGE }: Props) => {
    return (
        <Alert severity='info'>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    );
};
