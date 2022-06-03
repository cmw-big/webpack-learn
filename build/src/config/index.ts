import getDevConfig from './webpack.dev.js'
import getProdConfig from './webpack.prod.js'

let getConfig = getProdConfig
if (process.env.NODE_ENV !== 'production') {
  getConfig = getDevConfig
}
export default getConfig
