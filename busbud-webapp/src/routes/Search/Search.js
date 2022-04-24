import React, { useCallback, useState } from 'react';
import PrimaryButton from '../../UI/Button/PrimaryButton';
import FareCard from '../../businessComponents/FareCard/FareCard';
import { getDepartures } from '../../apiClient/departures';
import s from './Search.module.css';

function Search() {
    // Would app be extended with controls to select options like # of adults/child, currency, language
    // I would add Redux store to the app and connect the component to read from it
    // for such a micro app I decided not to add additional complexity
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [options] = useState({
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'en',
        currency: 'CAD',
        departure_date: '2022-08-01', // in the challenge, date is already in the past
        departure_origin: 'Quebec', // will be inserted from the list of cities not free typing
        arrival_origin: 'Montreal', // will be inserted from the list of cities not free typing
    });

    const initSearch = async () => {
        setLoading(true);
        setError(false);
        try {
            const data = await getDepartures(options);
            setData(data.departures);
            setError(false);
            setLoading(false);
        } catch (e) {
            setData(null);
            setLoading(false);
            setError(true);
        }
    };

    const ifShowData = useCallback(() => {
        return data && !isLoading && !isError;
    }, [data, isLoading, isError]);

    const renderItems = useCallback(() => {
        return data.map((item) => {
            const data = {
                ...item,
                arrival_origin: options.arrival_origin,
                departure_origin: options.departure_origin,
            };
            return <FareCard key={`fareCard_${item.id}`} {...data} />;
        });
    }, [data, options]);

    return (
        <main className={s.main}>
            <p data-testid="header_text">
                Traveling from Quebec to Montreal on August 1, 2022 x 1 adult
            </p>
            {
                // I would also extract loading into WithLoader HOC for production app
                isLoading && (
                    <>
                        <div className={s.animation}>
                            <img
                                data-testid="loader"
                                className={s.loader}
                                src="/dancing_person.gif"
                                alt="Dancing person loader"
                            />
                        </div>
                        <p>Searching for trips...</p>
                    </>
                )
            }
            {isError && <p data-testid="error_message">Unable to find the trips :(</p>}
            {!isLoading && <PrimaryButton onClick={initSearch}>Search</PrimaryButton>}
            {ifShowData() && <div className={s.dataGrid}>{renderItems()}</div>}
        </main>
    );
}

export default Search;
