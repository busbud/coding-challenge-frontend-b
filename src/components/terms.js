import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translation } from '../languages/translation';

export class Terms extends Component {
    render() {
        const terms = this.props.departure.terms;
        let list = [];
        let fund;
        if (terms.refund) {
            fund = (
                <div>
                    <FontAwesomeIcon icon="check" /> {Translation.terms.refund}
                </div>
            );
        } else {
            fund = (
                <div>
                    <FontAwesomeIcon icon="times" />{' '}
                    {Translation.terms.norefund}
                </div>
            );
        }
        list.push(<li key="refund">{fund}</li>);
        if (terms.kg_by_bag) {
            list.push(
                <li key="check">
                    <FontAwesomeIcon icon="check" />
                    {Translation.terms.kg_by_bag.replace(
                        /{terms.kg_by_bag}/,
                        terms.kg_by_bag
                    )}
                </li>
            );
        }
        if (terms.extra_bag_cost) {
            const extra_bag_cost =
                parseFloat(terms.extra_bag_cost) > 0
                    ? (parseFloat(terms.extra_bag_cost) / 100).toFixed(2)
                    : terms.extra_bag_cost;
            list.push(
                <li key="xtra">
                    <FontAwesomeIcon icon="check" />
                    {Translation.terms.extra_bag_cost.replace(
                        /{terms.extra_bag_cost}/,
                        `$${extra_bag_cost}`
                    )}
                </li>
            );
        }
        return (
            <ul>
                <li className="details-header">Terms and Conditions</li>
                {list}
            </ul>
        );
    }
}
