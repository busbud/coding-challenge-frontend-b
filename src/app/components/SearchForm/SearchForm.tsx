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

  > * {
    margin: 0 5px;
    padding: 10px;
    background: none;
    color: white;
    border: 1px solid;
  }
`;

@inject('store')
@observer
class SearchForm extends React.Component<MobxProps> {
  state = {
    date: "2018-08-02",
    passangerNumber: 1,
  }

  updatePassangerNumber = (value: string) => {
    this.setState({
      passangerNumber: value,
    })
  }

  updateDate = (value: string) => {
    this.setState({
      date: value,
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.store.search(this.state.date, this.state.passangerNumber)
  }

  render() {
    const { date, passangerNumber } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <input type="text" value={'New York'} onChange={() => {}}/>
        <input type="text" value={'Montreal'}  onChange={() => {}}/>
        <input type='date' value={date} onChange={(e) => this.updateDate(e.target.value)} />
        <input type='number' value={passangerNumber} onChange={(e) => this.updatePassangerNumber(e.target.value)} />
        <button role="submit"> Search</button>
      </Form>
    )
  }
}


export default SearchForm as React.ComponentClass<Props>;