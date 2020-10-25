import React from 'react';

export default function List({data, isLoading, error}){
    return(
        <div>
            {error ? <div>Error!</div> : ''}
            {isLoading ? <div>Loading...</div> : ''}
            {data && data.map(departure => {
                return <div key={departure.id}>{departure.id}</div>
            })}
        </div>
    )
}