import * as React from 'react'
import { FunctionComponent, useEffect, useRef } from 'react'
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
}

const CsvData = async (url: string) => {
  return await d3.csv(url)
}

const BarComponent: FunctionComponent<Props> = ({
  margin,
  width = 460, height = 400,
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null)
  const mWidth = width - margin.left - margin.right
  const mHeight = height - margin.top - margin.bottom
  
  const svg = d3.select(svgRef.current)
    .append('svg')
      .attr('width', mWidth + margin.left + margin.right)
      .attr('height', mHeight + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate("${margin.left}, ${margin.top}")`)
  
  useEffect(() => {
    CsvData(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv"
    ).then((data) => {
      const x = d3.scaleLinear()
      .domain([0, 1000])
      .range([0, mWidth])
      
      svg.append('g')
        .attr('transform', `translate(0, ${mHeight})`)
        .call(d3.axisBottom(x))
      
      const histogram = d3.histogram()
        .value(function(d: any) { return d.price })
        // @ts-ignore
        .domain(x.domain())
        .thresholds(x.ticks(70))
      
      const bins = histogram(data)
      
      const y = d3.scaleLinear()
        .range([height, 0])
      // @ts-ignore
      y.domain([0, d3.max(bins, function(d) { return d.length })])
      
      svg.append('g')
        .call(d3.axisLeft(y))
      
      svg.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
        .attr('x', 1)
        .attr('transform', function(d) {
          // @ts-ignore
          return `translate(${x(d.x0)}, ${y(d.length)}})`
        })
        .attr('width', function(d) {
          // @ts-ignore
          return x(d.x1) - x(d.x0) - 1
        })
        .attr('height', function(d) {
          // @ts-ignore
          return mHeight - y(d.length)
        })
      .style('fill', '#69b3a2')
    })
  }, [svg])
  
  return (
    <div ref={svgRef} />
  )
}

export default BarComponent
