import { Component, ErrorInfo } from 'react'

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    count: 0
  }

  // 获取子组件的错误
  static getDerivedStateFromError() {
    console.log('error')
    return {
      hasError: true
    }
  }

  // 页面没有阻塞，才会执行。
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo, 'componentDidCatch')
  }

  render() {
    const { hasError, count } = this.state
    const { children } = this.props
    if (hasError) {
      return <h1>{count}</h1>
    }
    return children
  }
}
