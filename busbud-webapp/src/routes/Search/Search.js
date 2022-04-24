import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { getDepartures } from '../../apiClient/departures';
import s from './Search.module.css';

function Search() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    const initSearch = async () => {
        setLoading(true);
        try {
            const data = await getDepartures();
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
            return (
                <div className={s.gridWrapper} key={`grid_wrapper_${item.id}`}>
                    <Grid container spacing={3} key={`grid_container_${item.id}`}>
                        <Grid
                            data-testid={`departure_time_${item.id}`}
                            item
                            xs={4}
                            lg={3}
                            key={`departure_time_${item.id}`}
                        >{`Departing at: ${item.departure_time}`}</Grid>
                        <Grid
                            data-testid={`departure_location_${item.id}`}
                            key={`departure_location_${item.id}`}
                            item
                            xs={4}
                            lg={2}
                        >{`From: ${item.departure_location}`}</Grid>
                        <Grid
                            data-testid={`arrival_time_${item.id}`}
                            key={`arrival_time_${item.id}`}
                            item
                            xs={4}
                            lg={2}
                        >{`Arriving at: ${item.arrival_time}`}</Grid>
                        <Grid
                            data-testid={`arrival_location_${item.id}`}
                            key={`arrival_location_${item.id}`}
                            item
                            xs={4}
                            lg={3}
                        >{`To: ${item.arrival_location}`}</Grid>
                        <Grid
                            data-testid={`total_price_${item.id}`}
                            key={`total_price_${item.id}`}
                            item
                            xs={4}
                            lg={2}
                        >{`Total price:${item.total_price} ${item.currency}`}</Grid>
                    </Grid>
                </div>
            );
        });
    });

    return (
        <div className="App">
            <main className={s.main}>
                <p data-testid="header_text">
                    Traveling from Quebec to Montreal on July 1, 2022 x 1 adult
                </p>
                {isLoading && (
                    <>
                        <img
                            data-testid="loader"
                            className={s.loader}
                            src="/dancing_person.gif"
                            alt="Dancing person loader"
                        />
                        <p>Searching for trips...</p>
                    </>
                )}
                {isError && <p data-testid="error_message">Unable to find the trips :(</p>}
                {!isLoading && (
                    <Button
                        data-testid="search_button"
                        variant="outlined"
                        color="secondary"
                        size="large"
                        classes={{
                            root: s.button,
                        }}
                        onClick={initSearch}
                    >
                        Search
                    </Button>
                )}
                {ifShowData() && (
                    <div className={s.dataGrid}>
                        <Grid spacing={3}>{renderItems()}</Grid>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Search;
