import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

import HalfPie from '../Component/HalfPie'

let container: HTMLDivElement | null

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement)
  container = null
});

describe('파이 테스트', () => {
  it('차트 그리기', () => {
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
})
