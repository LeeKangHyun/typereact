import styled from 'styled-components'

export const Wrap = styled.article`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  display: flex;
  flex: 1;
  padding: .6rem 0;
  font-size: 2rem;
  justify-content: center;
`

const BaseForm = styled.form<HTMLFormElement & { [propName: string]: any }>`
  display: flex;
  flex: 1;
`

export const NameForm = styled(BaseForm)`
  margin-left: auto;
  input {
  }
`

const BaseBtn = styled.button<HTMLButtonElement & { [propName: string]: any}>`
  width: 3em;
  padding: 0;
  font-size: 1.2rem;
  background: none;
`

export const Button = styled(BaseBtn)`

`