import React, { FC } from 'react'

interface Props {
  text: string
  done: boolean
  onToggle(): void
  onRemove(): void
}

const TodoItemComponent: FC<Props> = ({
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

export default TodoItemComponent
