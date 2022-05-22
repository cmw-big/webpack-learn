const path = require('path')

const spacingList = {}
for (let i = 0; i < 100000; i++) {
  spacingList[i] = `${i}px`
}
const opacityList = {}
for (let i = 0; i < 100; i++) {
  opacityList[i] = `.${i / 10}`
}

module.exports = {
  content: [
    'packages/**/src/**/*.{js,jsx,ts,tsx}',
    'libs/**/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: spacingList,
      opacity: opacityList
    }
  },
  plugins: []
}
