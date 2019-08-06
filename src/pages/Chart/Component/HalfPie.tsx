import * as React from 'react'
import {
  Fragment,
  FunctionComponent,
  useEffect, useRef
} from 'react'
import * as d3 from 'd3'

interface Props {
  width?: number
  height?: number
  data: number[]
  thickness?: number
  colors: string[]
  tooltip?: boolean
}

const HalfPieComponent: FunctionComponent<Props> = ({
  colors, data,
  thickness = 100, height = 300, width = 600
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null)
  // const cache = useRef<number[]>(data)
  
  // Settings
  const anglesRange = 0.5 * Math.PI
  const radis = Math.min(width, 2 * height) / 2
  const pies = d3.pie().value( (d: number) => d).sort(null).startAngle(anglesRange * -1).endAngle(anglesRange)
  const arc = d3.arc().outerRadius(radis).innerRadius(radis - thickness)
  
  useEffect(() => {
    const translation = (x: number, y: number) => `translate(${x}, ${y})`
    const svg = d3.select(svgRef.current).append('svg').attr('width', width).attr('height', height).attr('class', 'half-donut').append('g').attr('transform', translation(width / 2, height))
    
    const tip = d3.select('body').append('div').attr('class', 'toolTip').style('position', 'absolute')
    const Scale = (datum: object, index: number, groups: SVGPathElement[]) => {
      console.log(d3.event)
      tip.style('left', d3.event.pageX - 50 + 'px')
      .style('top', d3.event.pageY - 70 + 'px')
      .style('display', 'inline-block')
      .html(`Hello, World ${index}`)
    }
    
    svg.selectAll('path')
    .data(pies(data))
    .enter()
    .append('path')
    .attr('fill', (d, i) => colors[i])
    .attr('d', arc as any)
    .on('mouseover', Scale)
    .on('mousemove', Scale)
    .on('mouseout', () => tip.style('display', 'none'))
    
    
    return () => {
      console.log('half-pie remove')
      svg.remove()
    }
  }, [anglesRange, arc, colors, data, height, pies, radis, thickness, width])
  
  return (
    <Fragment>
      <div ref={svgRef} />
    </Fragment>
  )
}

export default HalfPieComponent
