import React from 'react'
import {
    Image
} from 'react-bootstrap'

const getLogo = (props) => {
    
    const operator = props.operators.filter(operator => operator.id === props.operatorId)
    
    return operator[0].logo_url
}

const Logo = (props) => (
        <Image src={ getLogo(props)} responsive />
    )


export default Logo

