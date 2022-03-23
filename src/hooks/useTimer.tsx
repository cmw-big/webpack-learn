import { useEffect, useState } from 'react'

/**
 * 倒计时的hooks
 * @param count 倒计时的总时间
 * @param duration 每次倒计时的时间间隔
 * @returns 当前倒计时剩余的时间
 */
export default function useTimer(count = 60, duration = 1000) {
  const [time, setTime] = useState(count)
  useEffect(() => {
    const timer = window.setTimeout(() => {
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
