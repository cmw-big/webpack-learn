import useTimer from '@/hooks/useTimer'
import ErrorBoundary from '@/errorBoundary'

// 这个上下文，赋值
export default function App() {
  const time = useTimer(3, 1000)
  return (
    <ErrorBoundary>
      <h1>我是App</h1>
      <h2>{time}</h2>
      <button type="button">我获取所有的学生</button>
    </ErrorBoundary>
  )
}
