import React, {useEffect, useState} from 'react';
import List from './List'
import Footer from './Footer'
import HeaderContainer from './Header/HeaderContainer'
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query"; //I'm using react-query that handles cahcing and other utilities out of the box

const queryCache = new QueryCache();

export default function queryWrapperContainer(props){
    return(
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Container />
        </ReactQueryCacheProvider>        
    )
}

function usePollDepartures(){ //extracted fetch/poll functionality
    const headers = new Headers({'X-Busbud-Token': process.env.REACT_APP_TOKEN});
    const [departure, changeDeparture] = useState(new Date().toISOString().substring(0, 10))
    const [queryIndex, setQueryIndex] = useState(0);
    const [enabled, toggle] = useState(true);
    const [pollString, setPoll] = useState('') //first call needs to be an initialize search call
    const urlParams = new URLSearchParams(window.location.search);
    const origin = urlParams.get('origin') || 'f2m673'
    const destination = urlParams.get('destination') || 'f25dvk'
    const url = "https://napi.busbud.com/x-departures/" + origin + "/" + destination + "/" + departure + "/" + pollString;
    const response = useQuery(departure, () =>
        fetch(url,{headers})
        .then((res) => 
            res.json()
        ).then((data) => {
            if (data.complete || data.error) {
                toggle(false) // no more fetching/polling. enable = false
                setPoll('');
                setQueryIndex(0);
            } else {
                setQueryIndex(queryIndex + data.departures.length) //change index for new poll
                setPoll('poll?index=' + (queryIndex + data.departures.length)) //create poll with the required index
            }
            return data
        }), 
        {enabled, refetchInterval:3000 //if enabled, the query will run every 3 seconds
        });
    return {toggle, departure, changeDeparture, response, enabled}
}


function Container(){
    const {toggle, changeDeparture, response, enabled, departure } = usePollDepartures() //get initial response and keep polling
    return(
        <div>
            <HeaderContainer
                enabled={enabled}
                departure={departure} 
                triggerSearch={() => toggle(true)} 
                changeDeparture={(e) => changeDeparture(e.target.value)}/>
            <List 
                enabled={enabled} 
                latestData={response.data} 
                isLoading={response.isLoading} 
                error={response.isError || (response.data && response.data.error)}/>
            <Footer/>
        </div>
    )
}