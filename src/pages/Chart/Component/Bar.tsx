import * as React from 'react'
import { useEffect, useRef, FunctionComponent } from 'react'
import * as d3 from 'd3'

interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

interface Data {
  letter: string
  frequency: number
}

interface Props {
  width?: number
  height?: number
  margin: Margin
  data: Data[]
}

const BarComponent: FunctionComponent<Props> = ({
  margin, data,
  width = 460, height = 400,
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null)
  const mWidth = width - margin.left - margin.right
  const mHeight = height - margin.top - margin.bottom

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .append('svg')
        .attr('width', mWidth + margin.left + margin.right)
        .attr('height', mHeight + margin.top + margin.bottom)

    // X axis
    const x = d3.scaleBand().rangeRound([0, mWidth]).padding(0.1)
    x.domain(data.map(function(d) { return d.letter }))

    // Y axis
    const y = d3.scaleLinear().rangeRound([mHeight, 0])
    y.domain([0, d3.max(data, d => d.frequency) as number])

    // g
    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    g.append('g')
    .attr('transform', `translate(0, ${mHeight})`)
    .call(d3.axisBottom(x))

    g.append('g')
    .call(d3.axisLeft(y).ticks(10, '%'))

    g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr("x", d => x(d.letter) as number)
    .attr("y", d => y(d.frequency))
    .attr("width", x.bandwidth())
    .attr("height", d => mHeight - y(d.frequency))

    return () => {
      svg.remove()
    }
  }, [data, mHeight, mWidth, margin.bottom, margin.left, margin.right, margin.top])

  return (
    <div ref={svgRef} />
  )
}

export default BarComponent
