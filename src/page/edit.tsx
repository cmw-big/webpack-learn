import {
  memo,
  MouseEventHandler,
  useCallback,
  useReducer,
  type FC
} from 'react'
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'

const Edit: FC = () => {
  // 设置query的内容
  const [searchParams, setSearchParams] = useSearchParams({
    filter: '1'
  })
  const location = useLocation()
  const navigate = useNavigate()
  const handleNavigateDetail: MouseEventHandler = useCallback(() => {
    navigate(`/detail${location.search}`)
  }, [location, navigate])
  function reducer(state: { count: number }, action: { type: string }) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      default:
        throw new Error()
    }
  }
  const initialState = { count: 0 }
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)
  const handleClick = useCallback(() => {
    dispatch({ type: 'increment' })
  }, [])

  return (
    <div>
      <div onClick={handleClick}>edit page</div>
      <Link to="132">
        <h2>editItem</h2>
      </Link>
      <input
        type="text"
        value={searchParams.get('filter') || ''}
        onChange={e => {
          const filter = e.target.value
          if (filter) {
            setSearchParams({ filter })
          } else {
            setSearchParams({})
          }
        }}
      />
      <button type="button" onClick={handleNavigateDetail}>
        我跳转去detail页面
      </button>
      {/* Outlet的主要作用是ui的一个展示。 */}
      <Outlet />
    </div>
  )
}
export default memo(Edit)
