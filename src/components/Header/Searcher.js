import React from 'react';

export default function SearcherComponent(props){

    return(
        <div>
            <button onClick={props.triggerSearch} className="button">Search!</button>
        </div>
    )
}

