import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '../router-store';
import { Todo } from './todo';

const selectActiveTodoId = selectRouteParam('todoId');

export interface TodosPageState {
  readonly todos: readonly Todo[];
  readonly activeTodo?: Todo;
}

export const selectTodosPageState = createSelector(
  selectActiveTodoId,
  (activeTodoId): TodosPageState => ({
    todos: TODOS,
    activeTodo: TODOS.find((todo) => todo.id === activeTodoId),
  })
);

const TODOS: Todo[] = [
  {
    id: '1',
    title: 'With Description',
    description: 'Informative Description',
  },
  {
    id: '2',
    title: 'Without Description',
    description: '',
  },
];
