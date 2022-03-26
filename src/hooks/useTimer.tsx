import { useEffect, useState } from 'react'

export default function useTimer(count = 60, duration = 1000) {
  const [time, setTime] = useState(count)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (time <= 0 && timer) {
        clearTimeout(timer)
        return
      }
      setTime(time - 1)
    }, duration)
    return () => clearTimeout(timer)
  }, [time, duration])
  return time
}
