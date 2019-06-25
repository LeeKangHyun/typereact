import React, { FC, ReactElement } from 'react'

import { InjectedTodoListProps } from 'pages/TodoList'

import TodoItemComponent from './TodoItem'

const TodoListComponent: FC<InjectedTodoListProps> = ({
  todoItems, input,
  onCreate, onChange, onToggle, onRemove
}) => {
  const todoItemList: ReactElement[] = todoItems.map(todo => (
    <TodoItemComponent
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
      <form onSubmit={onCreate}>
        <input onChange={onChange} value={input} type="text" />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todoItemList}
      </ul>
    </div>
  )
}

export default TodoListComponent
