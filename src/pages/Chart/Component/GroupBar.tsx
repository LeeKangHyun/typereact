import * as React from 'react'
import { useEffect, useRef, FunctionComponent } from 'react'

const GroupBarComponent: FunctionComponent = () => {
  const svgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

  }, [])

  return (
    <div ref={svgRef}>

    </div>
  )
}

export default GroupBarComponent
