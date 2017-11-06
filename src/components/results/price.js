import React from 'react'
import {
    Image
} from 'react-bootstrap'


const formatPrice = (price) => {
    return parseFloat(price/100)
}

const Price = (props) => (
        <p className="price text-center">
            ${formatPrice(props.price)}<sup>USD</sup>
        </p>
    )


export default Price

