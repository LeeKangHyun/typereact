import * as React from 'react'
import { Subtract } from 'utility-types'

export interface InjectedTodoListProps {
  todoItems: TodoItemData[]
  input: string
  onSubmit(): void
  onChange(): void
  onToggle(id: number): void
  onRemove(id: number): void
}

interface TodoItemData {
  id: number
  text: string
  done: boolean
}

interface State {
  todoItems: TodoItemData[]
  input: string
}

export default <P extends InjectedTodoListProps>(TodoListComponent: React.ComponentType<P>) => (
  class TodoList extends React.Component<Subtract<P, InjectedTodoListProps>, State> {
    id: number = 0
    
    constructor(props: Subtract<P, InjectedTodoListProps>) {
      super(props)
      this.state = {
        todoItems: [],
        input: ''
      }
    }
    
    onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      const { input } = this.state
      if (input === '') return
      this.setState(({ todoItems, input }) => ({
        input: '',
        todoItems: todoItems.concat({
          id: this.id++,
          text: input,
          done: false
        })
      }))
    }
    
    onChange = (event: React.FormEvent<HTMLInputElement>): void => {
      const { value } = event.currentTarget
      this.setState({
        input: value
      })
    }
    
    onToggle = (id: number): void => {
      const { todoItems }  = this.state
      const index = todoItems.findIndex(todo => todo.id === id)
      const selectedItem = todoItems[index]
      const nextItems = [ ...todoItems ]
      
      const nextItem = {
        ...selectedItem,
        done: !selectedItem.done
      }
      
      nextItems[index] = nextItem
      this.setState({
        todoItems: nextItems
      })
    }
  
    onRemove = (id: number): void => {
      this.setState(({ todoItems }) => ({
        todoItems: todoItems.filter(todo => todo.id !== id)
      }))
    }
    
    render() {
      const { ...props } = this.props
      return (
        <TodoListComponent
          {...props as P}
          {...this.state as State}
          onSubmit={this.onSubmit}
          onToggle={this.onToggle}
          onChange={this.onChange}
          onRemove={this.onRemove}
        />
      )
    }
  }
)
