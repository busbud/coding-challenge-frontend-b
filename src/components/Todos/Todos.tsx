import React from 'react';
import { Todo } from '../../store/todo';

interface Props {
  todos: Todo[];
}

export default function Todos({ todos = [] }: Props) {
  return (
    <>
      {todos.map(todo => (
        <div key={todo.id}>{todo.content}</div>
      ))}
    </>
  );
}
