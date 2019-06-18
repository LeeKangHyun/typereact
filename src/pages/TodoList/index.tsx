import * as React from 'react'

import withController, { InjectedTodoListProps } from './Controller'

interface Props {
  text: string
  done: boolean
  onToggle(): void
  onRemove(): void
}

const TodoItem: React.FC<Props> = ({
  text, done,
  onToggle, onRemove
}) => {
  return (
    <li>
      <b onClick={onToggle} style={{textDecoration: done ? 'line-through' : 'none'}}>{text}</b>
      <span style={{ all: 'unset', marginLeft: '0.5rem' }} onClick={onRemove}>[ 지우기 ]</span>
    </li>
  )
}

const TodoListComponent: React.FC<InjectedTodoListProps> = ({
  todoItems, input,
  onSubmit, onChange, onToggle, onRemove
}) => {
  const todoItemList: React.ReactElement[] = todoItems.map(todo => (
    <TodoItem
      key={todo.id}
      text={todo.text}
      done={todo.done}
      onToggle={() => onToggle(todo.id)}
      onRemove={() => onRemove(todo.id)}
    />
  ))
  return (
    <div>
      <h1>TODO List</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={input} type="text" />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todoItemList}
      </ul>
    </div>
  )
}

export default withController(TodoListComponent)
