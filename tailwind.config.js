const path = require('path')

const spacingList = {}
for (let i = 0; i < 1000000; i++) {
  spacingList[i] = `${i}px`
}
const opacityList = {}
for (let i = 0; i < 100; i++) {
  opacityList[i] = `.${i / 10}`
}

module.exports = {
  content: [path.resolve(process.cwd(), 'src/**/*.{js,jsx,ts,tsx}')],
  theme: {
    extend: {
      spacing: spacingList,
      opacity: opacityList,
    }
  },
  plugins: []
}
