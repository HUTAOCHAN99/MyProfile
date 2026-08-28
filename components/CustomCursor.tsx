'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPressed, setIsPressed] = useState(false)
  const [isTouchVisible, setIsTouchVisible] = useState(false)
  const touchHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') {
        setPosition({ x: event.clientX, y: event.clientY })
      }
    }
    const handlePointerDown = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setIsPressed(true)

      if (event.pointerType === 'touch') {
        setIsTouchVisible(true)
        if (touchHideTimeout.current) clearTimeout(touchHideTimeout.current)
      }
    }
    const handlePointerUp = (event: PointerEvent) => {
      setIsPressed(false)

      if (event.pointerType === 'touch') {
        touchHideTimeout.current = setTimeout(() => {
          setIsTouchVisible(false)
        }, 450)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      if (touchHideTimeout.current) clearTimeout(touchHideTimeout.current)
    }
  }, [])

  return (
    <img
      src={isPressed || isTouchVisible ? '/cursor/click.webp' : '/cursor/hover.webp'}
      alt=""
      aria-hidden="true"
      className={`custom-cursor${isTouchVisible ? ' is-touch-visible' : ''}`}
      style={{ left: position.x, top: position.y }}
    />
  )
}
