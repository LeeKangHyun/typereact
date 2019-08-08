import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

import HalfPie from '../Component/HalfPie'
import Bar from '../Component/Bar'

let container: HTMLDivElement | null

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement)
  container = null
});

describe('Chart 테스트', () => {
  it('Pie 차트 그리기', () => {
    act(() => {
      ReactDOM.render(
        <div>
          <HalfPie
            thickness={50}
            data={[0.45, 0.27, 0.27]}
            colors={['#9a3dea', '#59cedb', '#484c9f']}
          />
        </div>,
        container
      )
    })
  })

  it('Bar 차트 그리기', () => {
    act(() => {
      ReactDOM.render(
        <div>
          <Bar
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
        </div>,
        container
      )
    })
  })
})
