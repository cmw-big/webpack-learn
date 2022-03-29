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
    const timer = window.setInterval(() => {
      // 如果useEffect不执行的话，内部使用的state的值就是那一次的上下文的time
      if (time <= 0 && timer) {
        clearInterval(timer)
        return
      }
      setTime(n => n - 1)
    }, duration)
    return () => window.clearInterval(timer)
  }, [time, duration])
  return time
}

// 函数组件的每次执行，都会创建新的上下文。
// 如果useEffect中回调一直没有执行，那么内部使用state值，也是最开始的state的值。
// 如果传入的是一个函数的话，函数的参数就是之前每一次的返回值。那么就不会取当前上下文的time的值。
