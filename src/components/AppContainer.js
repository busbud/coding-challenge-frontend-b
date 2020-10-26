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

function usePollDepartures(){ //extracted fetch/poll functionality in a custom hook
    const headers = new Headers({'X-Busbud-Token': 'process.env.REACT_APP_TOKEN'});
    const [queryIndex, setQueryIndex] = useState(0);
    const [enabled, toggle] = useState(false);
    const [pollString, setPoll] = useState('') //first call needs to be an initialize search call
    const url = "https://napi.busbud.com/x-departures/gcpvj0/gcpn7m/2020-10-31/" + pollString;
    const response = useQuery("busbud", () =>
        fetch(url,{headers})
        .then((res) => 
            res.json()
        ).then((data) => {
            if (data.complete || data.error) {
                toggle(false) // no more fetching/polling. enable = false
                setPoll('');
            } else {
                setQueryIndex(queryIndex + data.departures.length) //change index for new poll
                setPoll('poll?index=' + (queryIndex + data.departures.length)) //create poll with the required index
            }
            return data
        }), 
        {enabled, refetchInterval:3000 //if enabled, the query will run every 3 seconds
        });
    return {toggle, response, enabled}
}


function Container(){
    const {toggle, response, enabled } = usePollDepartures() //get response and toggle
    return(
        <div>
            <HeaderContainer  triggerSearch={() => toggle(true)}/>
            <List 
                enabled={enabled} 
                latestData={response.data} 
                isLoading={response.isLoading} 
                error={response.error}/>
            <Footer/>
        </div>
    )
}