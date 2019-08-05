import * as React from 'react'
import { Component, FormEvent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { TodoItemDataParams, actionCreators as todosActions } from 'store/modules/Todos'
import { StoreState } from 'store/modules'

import TodoListComponent from './Component/TodoList'

export interface InjectedTodoListProps {
  input: string
  todoItems: TodoItemDataParams[]
  onCreate(event: any): void
  onChange(event: any): void
  onToggle(id: number): void
  onRemove(id: number): void
}

interface Props {
  todoItems: TodoItemDataParams[]
  input: string
  TodosActions: typeof todosActions
}

class TodoList extends Component<Props> {
  onCreate = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const { TodosActions, input } = this.props
    TodosActions.create(input)
  }
  
  onChange = (event: FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget
    const { TodosActions } = this.props
    if (value === '') return
    TodosActions.changeInput(value)
  }
  
  
  onToggle = (id: number): void => {
    const { TodosActions } = this.props
    TodosActions.toggle(id)
  }
  
  onRemove = (id: number): void => {
    const { TodosActions} = this.props
    TodosActions.remove(id)
  }
  
  render() {
    const { todoItems, input } = this.props
    return (
      <TodoListComponent
        todoItems = { todoItems }
        input = { input }
        onCreate = { this.onCreate }
        onToggle = { this.onToggle }
        onChange = { this.onChange }
        onRemove = { this.onRemove }
      />
    )
  }
}

export default connect(
  ({ todos }: StoreState ) => ({
    input: todos.input,
    todoItems: todos.todoItems
  }),
  (dispatch) => ({
    TodosActions: bindActionCreators(todosActions, dispatch),
  })
)(TodoList);
