import * as React from 'react'
import {
  useEffect, useRef,
  FunctionComponent,
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
  thickness = 100, height = 300, width = 600, tooltip = true,
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null)
  // const cache = useRef<number[]>(data)

  // Settings
  const anglesRange = 0.5 * Math.PI
  const radis = Math.min(width, 2 * height) / 2

  const pies = d3.pie().value( (d: number) => d).sort(null).startAngle(anglesRange * -1).endAngle(anglesRange)
  const arc = d3.arc().outerRadius(radis).innerRadius(radis - thickness)
  const tip = d3.select('body').append('div').attr('class', 'toolTip').style('position', 'absolute')

  useEffect(() => {
    const translation = (x: number, y: number) => `translate(${x}, ${y})`
    const svg = d3.select(svgRef.current).append('svg').attr('width', width).attr('height', height).attr('class', 'half-donut').append('g').attr('transform', translation(width / 2, height))

    const Scale = (datum: object, index: number, groups: SVGPathElement[]) => {
      if (!tooltip) return
      console.log(d3.event, d3.select(groups[index]))
      d3.select(groups[index])
      tip.style('left', d3.event.pageX - 50 + 'px')
      .style('top', d3.event.pageY - 70 + 'px')
      .style('display', 'inline-block')
      .html((d, i, e) => {
        return `
          <div>
            Hello, World ${JSON.stringify(e, null, 2)}
          </div>
        `
      })
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
      svg.remove()
      tip.remove()
    }
  }, [anglesRange, arc, colors, data, height, pies, radis, thickness, tip, tooltip, width])

  return (
    <div ref={svgRef} />
  )
}

export default HalfPieComponent
