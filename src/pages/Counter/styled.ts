import styled from 'styled-components'

export const Wrap = styled.div``

export const Btn = styled.button`
  width: 3rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  outline: none;
  transition: box-shadow 150ms ease-out;
  &:hover {
    background-color: aliceblue;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    transition: box-shadow 150ms ease;
  }
`
