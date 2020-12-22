
import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { omit } from 'lodash';
import styled from 'styled-components';

const propTypes = {
    autoFocus: PropTypes.bool,
    initialDate: momentPropTypes.momentObj,
    selectedBgColor: PropTypes.string,
    selectedTextColor: PropTypes.string,
    isNotValid: PropTypes.bool,
};
const defaultProps = {
    autoFocus: false,
    initialDate: null,
    selectedBgColor: '#4f7a5af5',
    selectedTextColor: '#fff',
};
export const Wrapper = styled.div`
    margin: 0px 41px 0 24px;
        .CalendarDay__selected {
        &,
        &:active,
        &:hover {
            background: #4f7a5af5;
            border: 1px solid ;
        }
    }
    .SingleDatePickerInput__withBorder {
        display: flex;
        align-items: center;
    }
    .DateInput {
        width: auto;
        flex: 1 1 auto;
        margin: -3px;
    }
    .DateInput_input {
        font-size: 15px;
        line-height: 1;
        padding: 24px 20px;
        border: none;
    }
    .DateRangePickerInput_arrow_svg {
        width: 20px;
        height: 20px;
    }
    .SingleDatePickerInput_calendarIcon {
        flex: 0 0 auto;
        margin-left: 4px;
    }
    .SingleDatePickerInput_clearDate {
        font-size: 10px;
    }

    ${({ isNotValid }) => {
        if (isNotValid) {
            return `
                .SingleDatePickerInput {
                    border-color: #4f7a5af5;
                    background-color: '#4f7a5af5';
                    
                    .DateInput_input {
                        background-color: #4f7a5af5;
                    }
                }
            `;
        }
    }}
`;

export class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: props.autoFocus,
        };
    }
    onFocusChange = ({ focused }) => {
        this.setState({ focused });
    };
    render() {
        const { focused } = this.state;
        const { isNotValid } = this.props;

        const props = omit(this.props, [
            'autoFocus',
            'initialDate',
            'selectedBgColor',
            'selectedTextColor',
            'isNotValid',
        ]);
        return (
            <Wrapper isNotValid={isNotValid}>
                <SingleDatePicker
                    block
                    id="date_input"
                    transitionDuration={0}
                    {...props}
                    focused={focused}
                    numberOfMonths={1}
                    onFocusChange={this.onFocusChange}
                    placeholder={'Date'}
                />
            </Wrapper>
        );
    }
}
DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;
