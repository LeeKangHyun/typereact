import * as React from 'react'
import {
  Fragment,
  FunctionComponent,
  useEffect, useRef
} from 'react'
import * as D3 from 'd3'

interface Props {
  width?: number
  height?: number
  data: number[]
  thickness?: number
  colors: string[]
}

const HalfPieComponent: FunctionComponent<Props> = ({
  colors, data,
  thickness = 100, height = 300, width = 600
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null)
  
  // Settings
  const anglesRange = 0.5 * Math.PI
  const radis = Math.min(width, 2 * height) / 2
  
  useEffect(() => {
    const pies = D3.pie().value( (d: number) => d).sort(null).startAngle(anglesRange * -1).endAngle(anglesRange)
    const arc = D3.arc().outerRadius(radis).innerRadius(radis - thickness)
    const translation = (x: number, y: number) => `translate(${x}, ${y})`
    const svg = D3.select(svgRef.current).append('svg').attr('width', width).attr('height', height).attr('class', 'half-donut').append('g').attr('transform', translation(width / 2, height))
    
    svg.selectAll('path')
    .data(pies(data))
    .enter()
    .append('path')
    .attr('fill', (d, i) => colors[i])
    .attr('d', arc as any)
    
    return () => {
      svg.remove()
    }
  }, [anglesRange, colors, data, height, radis, thickness, width])
  
  return (
    <Fragment>
      <div ref={svgRef} />
    </Fragment>
  )
}

export default HalfPieComponent
