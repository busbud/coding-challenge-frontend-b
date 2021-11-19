import React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    isDisabled: boolean;
    onClick: () => void;
};

const SearchButton = ({ isDisabled = true, onClick }: Props) => (
    <Button
        variant="contained"
        endIcon={<SearchIcon />}
        disabled={isDisabled}
        onClick={onClick}>
            Search
    </Button>
);

export default SearchButton;