import React from 'react';
import PrimaryButton from '../../UI/Button/PrimaryButton';
import { Link } from 'react-router-dom';
import s from './App.module.css';

function App() {
    return (
        <div className={s.wrapper}>
            <main className={s.main}>
                <img className={s.logo} src="/Logo-Osheaga.png" alt="Osheaga logo" />
                <PrimaryButton>
                    <Link className={s.link} to="/search">
                        Ready to Party?
                    </Link>
                </PrimaryButton>
            </main>
        </div>
    );
}

export default App;
