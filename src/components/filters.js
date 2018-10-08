import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { Translation } from '../languages/translation';

export class Filters extends Component {
    render() {
        return (
            <div className="filter">
                <ButtonDropdown
                    isOpen={this.props.dropdownOpen}
                    toggle={this.props.toggle}>
                    <DropdownToggle caret>
                        {Translation.sortBy} {this.props.sortBy}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.props.filters.map(s => (
                            //eslint-disable-next-line
                            <a
                                href="#"
                                key={s.id}
                                onClick={event =>
                                    this.props.sortDepartures(event, s.id)
                                }
                                className="dropdown-item">
                                {s.name}
                            </a>
                        ))}
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
}
