import React from 'react'
import {
    Image
} from 'react-bootstrap'


const formatPrice = (price) => {
    return parseFloat(price/100)
}

const Price = (props) => (
        <div>
            ${formatPrice(props.price)}<sup>USD</sup>
        </div>
    )


export default Price

