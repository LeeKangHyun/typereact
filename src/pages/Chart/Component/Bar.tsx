import * as React from 'react'
import { FunctionComponent, useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

interface D {
  letter: string
  frequency: number
}

interface Props {
  width?: number
  height?: number
  margin: Margin
  data: D[]
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
    // Y axis
    const y = d3.scaleLinear().rangeRound([mHeight, 0])
    // g
    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    x.domain(data.map(function(d) { return d.letter }))
    // @ts-ignore
    y.domain([0, d3.max(data, function(d) { return d.frequency })])

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
    // @ts-ignore
    .attr("x", function(d) {return x(d.letter) })
    // @ts-ignore
    .attr("y", function(d) { return y(d.frequency) })
    .attr("width", x.bandwidth())
    // @ts-ignore
    .attr("height", function(d) { return mHeight - y(d.frequency) })

    return () => {
      svg.remove()
    }
  }, [])

  return (
    <div ref={svgRef} />
  )
}

export default BarComponent
