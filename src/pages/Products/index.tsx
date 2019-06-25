import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import withController from './Controller'

type TParams = { id: string }

interface Props extends RouteComponentProps<TParams> {}

const Product: FC<Props> = ({ match }: RouteComponentProps<TParams>) => {
  return <h2>Products page {match.params.id}</h2>
}

export default withController(Product)
