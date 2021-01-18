// Packages
import { useRef, useEffect } from 'react'

const useClickAway = (effect: () => void) => {
  const node = useRef<HTMLInputElement>(null)

  const handler = (event: Event) => {
    const { target } = event

    if (node && node.current) {
      if (node.current.contains(target as Node)) return

      effect()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return node
}

export default useClickAway
