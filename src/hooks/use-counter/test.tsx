// Packages
import { renderHook, act } from '@testing-library/react-hooks'

// Hook
import useCounter from '.'

describe('[useCounter]', () => {
  test('should expose the  increment/decrement functions', () => {
    const { result } = renderHook(useCounter)

    expect(result.current.count).toBe(0)
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  test('should allow initial count customization', () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialCount: 1 }
    })
    expect(result.current.count).toBe(1)
  })

  test('should allow step customization', () => {
    const { result } = renderHook(useCounter, { initialProps: { step: 2 } })
    expect(result.current.count).toBe(0)
    act(() => result.current.increment())

    expect(result.current.count).toBe(2)
    act(() => result.current.increment())

    expect(result.current.count).toBe(4)
    act(() => result.current.increment())
    expect(result.current.count).toBe(6)
  })
})
