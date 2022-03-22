import { useEffect, useState } from 'react'

// 一个定时器的hooks
export default function useTimer(count: number, duration: number) {
  const [time, setTime] = useState(count)
  let timer: NodeJS.Timeout
  useEffect(() => {
    if (time <= 0 && timer) {
      clearTimeout(timer)
      return
    }
    timer = setTimeout(() => {
      setTime(time - 1)
    }, duration)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [time, duration])
}
