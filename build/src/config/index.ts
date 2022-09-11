import getDevConfig from './webpack.dev'
import getProdConfig from './webpack.prod'

let getConfig = getProdConfig
if (process.env.NODE_ENV !== 'production') {
  getConfig = getDevConfig
}
export default getConfig
