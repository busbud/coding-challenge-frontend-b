import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import s from './App.module.css';

function App() {
    return (
        <div className={s.wrapper}>
            <main className={s.main}>
                <img className={s.logo} src="/Logo-Osheaga.png" alt="Osheaga logo" />
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    classes={{
                        root: s.button,
                    }}
                >
                    <Link className={s.link} to="/search">
                        Ready to Party?
                    </Link>
                </Button>
            </main>
        </div>
    );
}

export default App;
