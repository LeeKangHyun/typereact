import * as React from 'react'
import {
  useEffect, useRef,
  FunctionComponent
} from 'react'
import * as d3 from 'd3'

interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

interface Props {
  width?: number
  height?: number
  margin: Margin
  color: string[]
  xAxis: string
  yAxis: string[] | string
  data: object[]
}

const GroupBarComponent: FunctionComponent<Props> = ({
  margin, color, data,
  width = 460, height = 400,
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null)
  const mWidth = width - margin.left - margin.right
  const mHeight = height - margin.top - margin.bottom

  useEffect(() => {
    // svg
    const svg = d3.select(svgRef.current).append('svg')
      .attr('width', mWidth + margin.left + margin.right)
      .attr('height', mHeight + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv')
    .then((data) => {
      const subgroups = data.columns.slice(1)
      const groups = d3.map(data, (datum: {[propName: string]: any}) => {
        return datum.group
      }).keys()

      const x = d3.scaleBand().domain(groups).range([0, mWidth]).padding(0.2)
      svg.append('g')
        .attr('transform', `translate(0, ${mHeight})`)
        .call(d3.axisBottom(x).tickSize(0))

      const y = d3.scaleLinear().domain([0, 40]).range([mHeight, 0])
      svg.append('g')
        .call(d3.axisLeft(y))

      const xSubgroup = d3.scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding(0.05)

      const colors = d3.scaleOrdinal().domain(subgroups).range(color)

      svg.append('g').selectAll('g')
        .data(data).enter()
        .append('g')
          .attr('transform', (datum: {[propName: string]: any}) => `translate(${x(datum.group)}, 0)`)
        .selectAll('rect').data((datum: {[propName: string]: any}) => subgroups.map(function(key) {
          return { key: key, value: datum[key] }
      })).enter().append('rect')
          .attr('x', (datum: {[propName: string]: any}) => xSubgroup(datum.key as string) as number)
          .attr('y', (datum: {[propName: string]: any}) => y(datum.value))
          .attr('width', xSubgroup.bandwidth())
          .attr('height', (datum: {[propName: string]: any}) => mHeight - y(datum.value))
          .attr('fill', (datum: {[propName: string]: any}) => colors(datum.key as string) as string)
    })

    return () => {
      svg.remove()
    }
  }, [color, mHeight, mWidth, margin.bottom, margin.left, margin.right, margin.top])

  return (
    <div ref={svgRef} />
  )
}

export default GroupBarComponent
