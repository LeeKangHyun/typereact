import * as React from 'react'
import {
  useState, useCallback,
  FunctionComponent, FormEvent,
} from 'react'

import HalfPieComponent from './Component/HalfPie'
import BarComponent from './Component/Bar'
import GroupBarComponent from './Component/GroupBar'

import { List } from './styled'

type Chart =
  | 'half_pie'
  | 'bar'
  | 'group_bar'

const render = (type: Chart) => {
  switch (type) {
    case 'half_pie':
      return (
        <HalfPieComponent
          thickness={60}
          width={600}
          height={300}
          data={[0.45, 0.27, 0.27]}
          colors={['#9a3dea', '#59cedb', '#484c9f']}
          tooltip={false}
        />
      )
    case 'bar':
      return (
        <BarComponent
          data={[
            {
              "letter": "A",
              "frequency": 0.08167,
            },
            {
              "letter": "B",
              "frequency": 0.01492,
            },
            {
              "letter": "C",
              "frequency": 0.02782,
            },
            {
              "letter": "D",
              "frequency": 0.04253,
            },
            {
              "letter": "E",
              "frequency": 0.12702,
            },
          ]}
          margin={{
            top: 10,
            right: 30,
            bottom: 30,
            left: 40
          }}
        />
      )
    case 'group_bar':
      return (
        <GroupBarComponent />
      )
    default:
      return (
        <div />
      )
  }
}

const ChartComponent: FunctionComponent = () => {
  const [type, setType] = useState<Chart>('bar')
  const [isLoading, setLoading] = useState(false)

  const onClick = useCallback(async (event: FormEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget
    await setLoading(true)

    await setType((name as Chart))

    await setLoading(false)
  }, [])

  return (
    <div>
      <List>
        <li><button name="half_pie" onClick={onClick}>half_pie</button></li>
        <li><button name="bar" onClick={onClick}>bar</button></li>
        <li><button name="group_bar" onClick={onClick}>group_bar</button></li>
      </List>
      {!isLoading ? (
        render(type)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default ChartComponent
