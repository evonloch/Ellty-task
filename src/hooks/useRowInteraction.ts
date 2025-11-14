import { useState, useCallback } from 'react'

export const useRowInteraction = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setIsPressed(false)
  }, [])

  const handleMouseDown = useCallback(() => setIsPressed(true), [])
  
  const handleMouseUp = useCallback(() => setIsPressed(false), [])

  return {
    isHovering,
    isPressed,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
  }
}
