import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useRecoilValue } from 'recoil';
import { isLoadingState } from '../store/states';

const LoadingBar = () => {
    const isLoading = useRecoilValue(isLoadingState);

    if (!isLoading) {
        return null;
    }

    return (<LinearProgress />);
};

export default LoadingBar;