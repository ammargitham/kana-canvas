'use client'

import { useEffect, useRef } from 'react'

interface Stroke {
  d: string
  duration: number
}

interface StrokeOrderAnimationProps {
  strokes: Stroke[]
  width: number
  height: number
}

export default function StrokeOrderAnimation({ strokes, width, height }: StrokeOrderAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    let delay = 0

    strokes.forEach((stroke) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', stroke.d)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', 'black')
      path.setAttribute('stroke-width', '2')
      path.setAttribute('stroke-linecap', 'round')
      path.setAttribute('stroke-linejoin', 'round')

      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length} ${length}`
      path.style.strokeDashoffset = `${length}`

      svg.appendChild(path)

      path.animate(
        [
          { strokeDashoffset: length },
          { strokeDashoffset: 0 }
        ],
        {
          duration: stroke.duration,
          fill: 'forwards',
          delay: delay
        }
      )

      delay += stroke.duration
    })

    return () => {
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild)
      }
    }
  }, [strokes])

  return (
    <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} />
  )
}
