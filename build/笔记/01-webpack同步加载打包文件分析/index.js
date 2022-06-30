;(() => {
  const modules = {
    './src/title.js': function (module, exports, require) {
      module.exports = 'title'
    }
  }
  var cache = {}
  // webpack实现的require方法
  function require(moduleId) {
    // 看缓存里面有没有这个模块，如果有的话，就直接返回
    if (cache[moduleId]) {
      return cache[moduleId].exports
    }
    // 默认是空对象
    var module = (cache[moduleId] = {
      exports: {}
    })
    modules[moduleId].call(exports, module, module.exports, require)
    return module.exports
  }
  //  ./src/index.js的代码
  ;(() => {
    let title = require('./src/title.js ')
    console.log(title)
  })()
})()
