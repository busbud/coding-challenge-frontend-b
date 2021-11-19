import React from 'react';
import Button from '@mui/material/Button';

const currencyFormatter = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });
const PurchaseButton = ({ price = 0, link = '' }: { price: number, link: string }) => {
    return (
        <Button
            sx={{
                backgroundColor: '#ff6c19',
                color: '#fff',
                ':hover': {
                    backgroundColor: '#FF7E1C',
                },
            }}
            variant="contained"
            href={link}
            target="_blank"
        >
            {currencyFormatter.format(price / 100)}
        </Button>
    );
};

export default PurchaseButton;