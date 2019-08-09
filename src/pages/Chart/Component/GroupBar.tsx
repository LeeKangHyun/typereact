import * as React from 'react'
import { useEffect, useRef, FunctionComponent } from 'react'
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

const GroupBarComponent: FunctionComponent<Props> = ({
  margin,
  width = 460, height = 400,
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null)
  const mWidth = width - margin.left - margin.right
  const mHeight = height - margin.top - margin.bottom

  // svg
  const svg = d3.select(svgRef.current).append('svg')
    .attr('width', mWidth + margin.left + margin.right)
    .attr('height', mHeight + margin.top + margin.bottom)

  useEffect(() => {

    return () => {
      svg.remove()
    }
  }, [])

  return (
    <div ref={svgRef} />
  )
}

export default GroupBarComponent
