import React from 'react'


const Loading = (props) => {
    
    if(!props.isVisible){
        return null
    }

    return (
        <h1 className="text-center">{props.message}...</h1>
    )
}
    



export default Loading

