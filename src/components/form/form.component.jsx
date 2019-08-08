import React from 'react';
import {Link} from 'react-router-dom';

import './form.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

const Form = () => (
    <div className='group'>
        <div className='form-item'>
            <label htmlFor='depart'>DEPARTURE</label>
            <input className='form-input' id='depart' defaultValue='New York, NY, USA'/>
        </div>
        <div className='form-item'>
            <label htmlFor='arrive'>ARRIVAL</label>
            <input className='form-input' id='arrive' defaultValue='Montreal, QC, CANADA'/>
        </div>
        <div className='form-item'>
            <label htmlFor='date'>DATE</label>
            <input className='form-input' id='date' type='date' defaultValue='2019-08-12' />
        </div>
        <div className='form-item'>
            <Link to='/search'>
                <CustomButton type='submit'> SEARCH BUSES </CustomButton>
            </Link>
        </div>
    </div>
)

export default Form;