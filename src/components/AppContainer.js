import React, {useState} from 'react';
import List from './List'
import Footer from './Footer'
import HeaderContainer from './Header/HeaderContainer'
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache();

export default function queryWrapperContainer(props){
    return(
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Container />
        </ReactQueryCacheProvider>        
    )
}

function usePollDepartures(){ //extracted fetch/poll functionality in a custom hook
    const headers = new Headers({'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA'});
    const [originalResponse, setOriginal] = useState(null)
    const [departures, setDepartures] = useState([])
    const [queryIndex, setQueryIndex] = useState(0);
    const [enabled, toggle] = useState(false);
    const [pollString, setPoll] = useState('')
    const url = "https://napi.busbud.com/x-departures/gcpvj0/gcpn7m/2020-11-15/" + pollString;
    const response = useQuery("busbud", () =>
        fetch(url,{headers})
        .then((res) => 
            res.json()
        ).then((data) => {
            if (data.origin_city_id) setOriginal(data)
            if (data.complete) {
                toggle(false) // no more fetching/polling
            } else {
                setQueryIndex(queryIndex + data.departures.length) //change index for new poll
                setPoll('poll?index=' + (queryIndex + data.departures.length)) //create poll with the required index
            }
            setDepartures(departures.concat(data.departures)) //we need to accumulate all the departures for every indexed response
            return data
        }), 
        {enabled, refetchInterval:3000 //if enabled, the query will run every 3 seconds
        });
    return {toggle, response, departures, originalResponse, enabled}
}


function Container(){
    const {toggle, response, departures, originalResponse, enabled} = usePollDepartures() //get response and toggle
    return(
        <div>
            <HeaderContainer triggerSearch={() => toggle(true)}/>
            {originalResponse && enabled && departures.length > 0 && <div>More results might be added to the list</div>}
            <List data={departures} isLoading={response.isLoading} error={response.error}/>
            <Footer/>
        </div>
    )
}