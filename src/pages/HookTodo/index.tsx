import * as React from 'react'
import { FunctionComponent } from 'react'

import { TodoItemDataParams } from 'store/modules/Todos'
import useTodoReducer, { UseEvents } from './Hooks/useTodoReducer'

import HookTodoListComponent from './Component/HookTodoList'

export interface InjectedTodoListProps extends UseEvents{
  input: string
  todoItems: TodoItemDataParams[]
}

const HookTodoComponent: FunctionComponent = () => {
  const [
    state,
    {
      onCreate,
      onToggle,
      onRemove,
      onChange,
    }
  ] = useTodoReducer()

  return (
    <HookTodoListComponent
      todoItems={state.todoItems}
      input={state.input}
      onCreate={onCreate}
      onToggle={onToggle}
      onChange={onChange}
      onRemove={onRemove}
    />
  )
}

export default HookTodoComponent
