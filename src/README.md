# TypeScript with React

## Functional components

```typescript jsx
import React, { FC } from 'react'

type CardProps = {
  title: string
  paragraph?: string // optional
}

export const Card: FC<CardProps> = ({ title, paragraph }) => <aside>
</aside>
```

## Class components

```typescript jsx
import React, { Component } from 'react'

interface ClockProps {
  
}

interface ClockState {
  time: Date
}

class Clock extends Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props)
    this.state = {
      time: new Date()
    }
  }
  
  render() {
    return <></>
  }
}

export default Clock
```

## defaultProps
```typescript jsx
import React, { FC } from 'react'

type CardProps = {
  title: string,
  paragraph?: string
}

export const Card: FC<CardProps> = ({ title, paragraph = 'Hello World' }) => <></>
```

# with React Children

## Default behaviour
```typescript jsx
import React, { FC } from 'react'

type CardProps = {
  title: string,
  paragraph: string
}

export const Card: FC<CardProps> = ({ title, paragraph, children }) => <></>
```

# with React Events

## Basic Event Handling
> AnimationEvent, ChangeEvent, ClipboardEvent, CompositionEvent, DragEvent, FocusEvent, FormEvent, KeyboardEvent, MouseEvent, PointerEvent, TouchEvent, TransitionEvent, WheelEvent
```typescript jsx
import React, { Component, MouseEvent } from 'react'

export class Button extends Component {
  handleClick(event: MouseEvent) {}
}
```

## Restrictive Event Handling
> tsconfig -> library 'dom' 추가 필수

```typescript jsx
import React, { Component, MouseEvent } from 'react'

export class Button extends Component {
  handleClick(event: MouseEvent<HTMLButtonElement>) {}
  
  handleAnotherClick(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {}
}
```

## InputEvent?
```typescript jsx
import React, { Component, SyntheticEvent } from 'react'

export class Input extends Component {
  handleInput(event: SyntheticEvent) {}
}
```

# with React Hooks

## useState

```typescript jsx
import React, { FC, useState } from 'react'

const Counter: FC<{ initial?: number }> = ({ initial = 0 }) => {
  const [clicks, setClicks] = useState(initial)
  return <>
    <p>{clicks}</p>
    <button onClick={() => setClicks(clicks + 1)}>+</button>
    <button onClick={() => setClicks(clicks - 1)}>-</button>
  </>
}
```

## useEffect
> 추가 타입을 제공할 필요가 없다.

```typescript jsx
import React, { FC, useState, useEffect } from 'react'

const Naming: FC = () => {
  const [name, setName] = useState('Dev kang')
  useEffect(() => {
    document.title = `Hello ${name}`
  }, [name])
}

const Handler: FC = () => {
  useEffect(() => {
    const handler = () => {
      document.title = window.width
    }
    window.addEventListener('resize', handler)
    
    return () => {
      window.removeEventListener('resize', handler)
    }
  })
}

```

## useContext
```typescript jsx
import React, { FC, useContext } from 'react'

export const LanguageContext = React.createContext({ lang: 'en' })

const Display: FC = () => {
  const { lang } = useContext(LanguageContext)
  return <>
    {lang}
  </>
}
```

## useRef
```typescript jsx
import React, { useRef } from 'react'
function TextInputWithFocusButton() {
  const inputEl = useRef<HTMLInputElement>(null)
  const onButtonClick = () => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus()
    }
  }
}
```

## useReducer
```typescript jsx
import React, { FC, useReducer } from 'react'

type ActionType = {
  type: 'reset' | 'decrement' | 'increment'
}

type StateType = {
  count: number
}

const initialState = { count: 0 }

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const Counter: FC<{ initialCount: number }> = ({ initialCount = 0 }) => {
  const [] = useReducer(reducer, { count: initialCount })
}
```

# with Redux

> 3.4 버전 이상부터<br>사용가능

```typescript
function addTodo({}) {}
function updateTodo({}) {}
function removeTodo({}) {}

type Action = 
  | ReturnType<typeof addTodo>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof removeTodo>

function reducer(state: any, action: Action) {

}
```

> 참조 

[TypeScript and React: Hooks](https://fettblog.eu/typescript-react/hooks/)
