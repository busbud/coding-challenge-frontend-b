import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SearchStore } from '../../store/search';
import styled from 'styled-components';

interface Props {
  onSubmit(): void;
}
  
interface MobxProps extends Props {
    store: SearchStore;
}

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 0 5px;
    padding: 10px;
    background: none;
    color: white;
    font-size: 16px;
    border: 1px solid;
  }

  @media (max-width: 620px) {
    justify-content: center;

    > * {
      width: 45%;
      margin: 5px;
    }
  }
`;

@inject('store')
@observer
class SearchForm extends React.Component<MobxProps> {

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.store.clearResults();
    this.props.store.search()
  }

  render() {
    const { setOutboundDate, setPassangerNumber, searchParams } = this.props.store;

    return (
      <Form onSubmit={this.handleSubmit}>
        <input type="text" value={'New York'} onChange={() => {}}/>
        <input type="text" value={'Montreal'}  onChange={() => {}}/>
        <input 
          type='date' 
          value={searchParams.outboundDate} 
          onChange={(e) => setOutboundDate(e.target.value)} 
        />
        <input 
          type='number' 
          value={searchParams.passangerNumber} 
          onChange={(e) => setPassangerNumber(Number(e.target.value))} 
        />
        <button role="submit"> Search</button>
      </Form>
    )
  }
}


export default SearchForm as React.ComponentClass<Props>;