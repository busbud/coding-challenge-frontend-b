import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useAction = <A extends (...args: any[]) => any>(action: A) => {
  const dispatch = useDispatch()

  const dispatchableAction = useCallback(
    (...args: Parameters<A>) => dispatch(action(...args)),
    [dispatch, action]
  )

  return dispatchableAction
}
