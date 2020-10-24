import React from 'react';
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

function Container(props){

    const { isLoading, error, data, refetch } = useQuery("repoData", () =>
    fetch(
      "https://api.github.com/repos/tannerlinsley/react-query"
    ).then((res) => res.json())
    , 
    {manual: true});    
    
    return(
        <div>
            <HeaderContainer/>
            <List data={data} triggerSearch={refetch}/>
            <Footer/>
        </div>
    )
}