import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'styled-bootstrap-grid';
import { useTranslation } from 'react-i18next';

const Input = styled.input`
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.7);
  color: rgba(2, 86, 135, 0.9);
  border-radius: 4px;
  padding: 0.5rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  border: none;
  padding: 1rem 1rem;
  margin-bottom: 0.3rem;

  &::placeholder {
    color: rgba(2, 86, 135, 0.4);
  }
`;

const Button = styled.button`
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  background: #ab216c;
  color: white;
  padding: 1rem 0.5rem;
  border: none;
  border-radius: 2px;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
`;

function SearchForm({ onSubmit }) {
  const [date, setDate] = useState('2020-07-02');
  const { t } = useTranslation();

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit && onSubmit(date);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={4}>
          <Input
            type='text'
            placeholder={t('SearchForm.departurePlaceholder')}
          />
        </Col>

        <Col md={4}>
          <Input
            type='text'
            placeholder={t('SearchForm.destinationPlaceholder')}
          />
        </Col>

        <Col md={4}>
          <Input
            type='text'
            placeholder={t('SearchForm.datePlaceholder')}
            value={date}
            onChange={e => {
              setDate(e.target.value);
            }}
            pattern='([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))'
            title={t('SearchForm.dateTitle')}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} mdOffset={8}>
          <Button type='submit'>{t('SearchForm.submitBtnLabel')}</Button>
        </Col>
      </Row>
    </form>
  );
}

export default SearchForm;
