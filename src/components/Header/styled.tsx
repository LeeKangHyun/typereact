import styled from 'styled-components'
import { Link as BaseLink } from 'react-router-dom'

export const Header = styled.nav`
  background-color: darkgoldenrod;
`

export const Ul = styled.ul`
  display: flex;
  padding: 0.6rem;
`

interface LiProps {
  readonly isLeft?: boolean
}

export const Li = styled.li<LiProps>`
  display: inline-block;
  ${props => props.isLeft ? `
    flex: auto;
    margin-right: auto;
  `:`
    margin-left: 2rem;
  `};
  a {
    color: aliceblue;
  }
`

export const Link = styled(BaseLink)``
