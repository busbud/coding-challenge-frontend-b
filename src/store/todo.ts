import uuid from 'uuid';
import { createSelector } from 'reselect';
import { AppState } from '.';

// Constants
const ADD_TODO = 'ADD_TODO';

// Typings
interface AddTodoAction {
  type: string;
  payload: string;
}

export interface Todo {
  id: string;
  content: string;
}

interface InitialTodoState {
  data: Todo[];
}

// Actions
export function addTodo(payload: string): AddTodoAction {
  return {
    type: ADD_TODO,
    payload
  };
}

// Initial state
const initialState: InitialTodoState = {
  data: []
};

// Reducers
export function todoReducer(state = initialState, action: AddTodoAction) {
  switch (action.type) {
    case ADD_TODO:
      return {
        data: [
          ...state.data,
          {
            id: uuid(),
            content: action.payload
          }
        ]
      };
    default:
      return state;
  }
}

// Selectors
const getTodosSelector = (state: AppState) => state.todos.data;

export const todosSelector = createSelector(getTodosSelector, todos => todos);
