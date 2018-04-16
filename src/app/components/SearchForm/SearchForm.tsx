import * as React from 'react';
import { format, addYears } from 'date-fns';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { SearchStore } from '../../store/search';
  
interface Props {
    store: SearchStore;
}

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;

  > button {
    margin: 0 5px;
    padding: 10px;
    background: none;
    color: white;
    font-size: 16px;
    border: 1px solid;
  }

  @media (max-width: 920px) {
    justify-content: center;


    > button {
      width: 91.5%;
      margin-top: 15px;
    }
  }
`;

const Input = styled.input`
  margin: 0 5px;
  padding: 10px;
  background: none;
  color: white;
  font-size: 16px;
  border: 1px solid;


  @media (max-width: 920px) {
    width: 45%;
    margin: 5px;
  }
`;


@inject('store')
@observer
class SearchForm extends React.Component<Props> {

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.store.clearResults();
    this.props.store.search()
  }

  render() {
    const { setOutboundDate, setPassangerNumber, searchParams } = this.props.store;
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input type="text" id="origin" value={'New York'} onChange={() => {}}/>
        <Input type="text" value={'Montreal'}  onChange={() => {}}/>
        <Input 
          type='date' 
          min={format(new Date(), 'YYYY-MM-DD')}
          max={format(addYears(new Date(), 1), 'YYYY-MM-DD')}
          value={searchParams.outboundDate} 
          onChange={(e) => setOutboundDate(e.target.value)} 
        />
        <Input 
          type='number' 
          value={searchParams.passangerNumber} 
          onChange={(e) => setPassangerNumber(Number(e.target.value))} 
        />
        <button role="submit"> Search</button>
      </Form>
    );
  }
}


export default SearchForm as React.ComponentClass<{}>;