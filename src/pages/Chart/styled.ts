import styled from 'styled-components'

export const List = styled.ul`
  margin: .6em;
  > li {
    display: inline-block;
    button {
      padding: .6em .8em;
      background: transparent;
      border: 1px solid #000;
      box-shadow: none;
      outline: none;
      &:hover {
        border: 1px solid #fff;
        box-shadow: 0 3px 6px 3px rgba(0, 0, 0, 0.15);
        transition: box-shadow 300ms ease, border 300ms ease;
      }
      &:active {
        border: 1px solid #000;
        box-shadow: none;
        transition: box-shadow 300ms ease, border 300ms ease;
      }
    }
    & + li {
      margin-left: .8em;
    }
  }
`
