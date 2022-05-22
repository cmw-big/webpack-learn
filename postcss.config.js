// 已经包含了autoprefixer和browserslist
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    require('postcss-import'),
    postcssPresetEnv(),
    require('tailwindcss')
  ]
}
