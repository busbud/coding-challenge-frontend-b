import { useState } from 'react'

type Params = {
  initialCount?: number
  step?: number
}

function useCounter({ initialCount = 0, step = 1 }: Params = {}) {
  const [count, setCount] = useState(initialCount)

  const increment = () => setCount((c) => c + step)
  const decrement = () => {
    if (count > initialCount) {
      setCount((c) => c - step)
    }
  }

  return { count, increment, decrement }
}

export default useCounter
