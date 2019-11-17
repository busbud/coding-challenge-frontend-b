import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';
import { addTodo, todosSelector, Todo } from '../../store/todo';
import Button from '../../components/Button';
import LayoutDefault from '../../layouts/LayoutDefault';
import Todos from '../../components/Todos';

interface Props {
  onClickAction: (payload: string) => void;
  todos: Todo[];
}

function Home({ onClickAction, todos }: Props) {
  return (
    <LayoutDefault>
      <Button onClickAction={onClickAction}>Add</Button>
      <Todos todos={todos} />
    </LayoutDefault>
  );
}

const mapStateToProps = (state: AppState) => ({
  todos: todosSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickAction: (payload: string) => dispatch(addTodo(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
