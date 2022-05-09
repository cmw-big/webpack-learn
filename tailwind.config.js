const spacingList = {}
for (let i = 0; i < 100; i++) {
  spacingList[i] = `${i}px`
}

module.exports = {
  content: ['**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: spacingList
    }
  },
  plugins: []
}

module.exports = require('../../tailwind.config.js')
