import { ContextType, createContext } from 'react'

export interface TodoItemDataParams {
  id: number
  text: string
  done: boolean
}

export interface TodoState {
  todoItems: TodoItemDataParams[]
  input: string
}

export const GlobalStore: ContextType = createContext<TodoState>({
  todoItems: [],
  input: ''
})
