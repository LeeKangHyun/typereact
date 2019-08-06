import * as React from 'react'
import { FunctionComponent } from 'react'

import HalfPieComponent from './Component/HalfPie'

const ChartComponent: FunctionComponent = () => {
  return (
    <div>
      <HalfPieComponent
        thickness={50}
        data={[0.45, 0.27, 0.27]}
        colors={['#9a3dea', '#59cedb', '#484c9f']}
      />
    </div>
  )
}

export default ChartComponent
