import * as React from 'react'
import { FormEvent, FunctionComponent } from 'react'

import useGlobal, { actionCreators, TodoItemDataParams } from './globalStore'
import HookTodoListComponent from './Component/HookTodoList'

export interface InjectedTodoListProps {
  input: string
  todoItems: TodoItemDataParams[]

  onCreate(event: FormEvent<HTMLFormElement>): void
  onChange(event: FormEvent<HTMLInputElement>): void
  onToggle(id: number): void
  onRemove(id: number): void
}

const HookTodoComponent: FunctionComponent = () => {
  const [state, dispatch] = useGlobal()

  const onCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { input } = state
    return dispatch(actionCreators.create(input))
  }

  const onToggle = (id: number) => dispatch(actionCreators.toggle(id))

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    return dispatch(actionCreators.changeInput(value))
  }

  const onRemove = (id: number) => dispatch(actionCreators.remove(id))

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
