import { FormEvent, useReducer } from 'react'
import reducer, { TodoState, actionCreators } from 'store/modules/Todos'

export interface UseEvents {
  onCreate(event: FormEvent<HTMLFormElement>): void
  onChange(event: FormEvent<HTMLInputElement>): void
  onToggle(id: number): void
  onRemove(id: number): void
}

export default function(): [TodoState, UseEvents] {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    todoItems: [],
    input: ''
  })

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

  const events = {
    onCreate,
    onToggle,
    onRemove,
    onChange,
  }

  return [ state, events ]
}
