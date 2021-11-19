import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRecoilState } from 'recoil';
import { errorState } from '../store/states';

const ErrorMessage = () => {
    const [ error, setError ] = useRecoilState(errorState);
    const anchorOrigin: SnackbarOrigin = {
        vertical: 'top',
        horizontal: 'center',
    };
    const onClose = () => setError('');

    if (!error) {
        return null;
    }

    return (
        <Snackbar
            anchorOrigin={{ ...anchorOrigin }}
            open={true}
            onClose={onClose}
            key={'errorMessage'}>
            <Alert
                severity='error'
                onClose={onClose}
                elevation={6}
                variant="filled"
            >
                {error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorMessage;