import * as React from 'react'
import { createContext, ComponentClass, FunctionComponent } from 'react'

interface TodoItemDataParams {
  id: number
  text: string
  done: boolean
}

export interface TodoState {
  todoItems: TodoItemDataParams[]
  input: string
}

const ctxt = createContext<TodoState | null>(null)

export const GlobalProvider = ctxt.Provider

export const GlobalConsumer = ctxt.Consumer

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function withContext<
  P extends { appContext?: TodoState | null },
  R = Omit<P, "appContext">
>(
  Component: ComponentClass<P> | FunctionComponent<P>
): FunctionComponent<R> {
  return function ComponentWithContext(props: R) {
    return (
      <GlobalConsumer>
        {value => <Component {...props} appContext={value} />}
      </GlobalConsumer>
    )
  }
}
