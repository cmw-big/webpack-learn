// commonjs加载esm
;(() => {
  const modules = {
    './src/title.js': function (module, exports, require) {
      // 以后可以通过这个属性来判断是不是esm
      require.r(exports)
      require.d(exports, {
        default: () => DEFAULT_EXPORT,
        age: () => age
      })
      const DEFAULT_EXPORT = 'title_name' // 默认导出
      const age = 'title_age'
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
    modules[moduleId].call(module.exports, module, module.exports, require)
    return module.exports
  }
  /**
   * 方法名字为什么叫r呢？减少文件的体积。但是__webpack_require__方法为什么这么大方呢？因为这些可以被压缩成一个单词，但是其他的属性，比如对象的key不能被压缩。
   *
   */
  require.r = exports => {
    // console.log(Object.prototype.toString.call(exports)) // [object Module]
    // 标识是一个模块 [object Module]
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    // 这个也是一个标识，表示这是一个esm。exports._esModule=true
    Object.defineProperty(exports, '_esModule', { value: true })
  }
  //   给exports上定义esm导出的所有属性值
  require.d = (exports, definition) => {
    for (const key in definition) {
      if (Object.hasOwnProperty.call(definition, key)) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key]
        })
      }
    }
  }
  //  ./src/index.js的代码
  ;(() => {
    let title = require('./src/title.js')
    console.log(title)
  })()
})()
