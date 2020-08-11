import { useEffect, useRef } from 'react'
import isEqual from 'lodash.isequal'

const useObserver = <T>(value: T, action: (value: T) => any): void => {
  const previous = useRef(value)
  useEffect(() => {
    if (!isEqual(previous.current, value)) action(value)
    previous.current = value
  }, [value])
}

export { useObserver }
