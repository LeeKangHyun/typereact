import { useReducer } from 'react'

export interface TodoItemDataParams {
  id: number
  text: string
  done: boolean
}

export interface TodoState {
  todoItems: TodoItemDataParams[]
  input: string
}

export const CREATE = 'todo/CREATE'
export const REMOVE = 'todo/REMOVE'
export const TOGGLE = 'todo/TOGGLE'
export const CHANGE_INPUT = 'todo/CHANGE_INPUT'

interface CreateAction {
  type: typeof CREATE
  payload: TodoItemDataParams
}

interface ToggleAction {
  type: typeof TOGGLE
  meta: {
    id: number
  }
}

interface ChangeInputAction {
  type: typeof CHANGE_INPUT
  meta: {
    input: string
  }
}

interface RemoveAction {
  type: typeof REMOVE
  meta: {
    id: number
  }
}

export type TodoActionTypes =
  | CreateAction
  | ToggleAction
  | ChangeInputAction
  | RemoveAction

let autoId = 0

function create(text: string): TodoActionTypes {
  return {
    type: CREATE,
    payload: {
      id: autoId++,
      text: text,
      done: false
    }
  }
}

function toggle(id: number): TodoActionTypes {
  return {
    type: TOGGLE,
    meta: {
      id
    }
  }
}

function changeInput(input: string): TodoActionTypes {
  return {
    type: CHANGE_INPUT,
    meta: {
      input: input
    }
  }
}

function remove(id: number): TodoActionTypes {
  return {
    type: REMOVE,
    meta: {
      id
    }
  }
}

export const actionCreators = {
  create,
  toggle,
  changeInput,
  remove,
}

const initialState: TodoState = {
  todoItems: [],
  input: ''
}

const reducer = (state: TodoState, action: TodoActionTypes): TodoState => {
  switch (action.type) {
    case CREATE:
      return {
        input: '',
        todoItems: [
          ...state.todoItems,
          action.payload
        ]
      }
    case TOGGLE:
      return {
        ...state,
        todoItems: state.todoItems.map(todo => {
          if (todo.id === action.meta.id) {
            todo.done = !todo.done
          }
          return todo
        })
      }
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.meta.input
      }
    case REMOVE:
      return {
        ...state,
        todoItems: state.todoItems.filter(todo => todo.id !== action.meta.id)
      }
    default:
      return state
  }
}

export default function() {
  return useReducer(reducer, initialState)
}
