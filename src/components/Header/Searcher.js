import React from 'react';
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";

export default function SearcherComponent({triggerSearch}){

    return(
        <div>
            <button onClick={triggerSearch} className="button">Search!</button>
        </div>
    )
}

