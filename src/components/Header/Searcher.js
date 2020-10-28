import React from 'react';

export default function SearcherComponent({triggerSearch, changeDeparture, enabled}){

    return(
        <div className="searcher">
            <input disabled={enabled} type="date" placeholder="departure" onChange={changeDeparture}/>
            <button disabled={enabled} onClick={triggerSearch} className="button">Search!</button>
        </div>
    )
}

