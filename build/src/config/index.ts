import devConfig from './webpack.dev'
import prodConfig from './webpack.prod'

let config = prodConfig
if (process.env.NODE_ENV !== 'production') {
  config = devConfig
}
export default config
