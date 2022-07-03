;(() => {
  // 模块内容
  var __webpack_modules__ = {}
  // The module cache
  var __webpack_module_cache__ = {}

  // The require function 专门用来加载模块的内容的。返回值就是module.exports
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    })

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    // Return the exports of the module
    return module.exports
  }
  // 声明了__webpack_require__.f 对象
  ;(() => {
    __webpack_require__.f = {}
    // 加载异步的模块代码
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = chunkId => {
      return Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
          __webpack_require__.f[key](chunkId, promises)
          return promises
        }, [])
      )
    }
  })() /* webpack/runtime/get javascript chunk filename */
  ;(() => {
    // This function allow to reference async chunks
    __webpack_require__.u = chunkId => {
      // return url for filenames based on template
      return 'js/' + chunkId + '.' + 'f2038f1a' + '.js'
    }
  })()
  //   加载文件
  ;(() => {
    var inProgress = {}
    var dataWebpackPrefix = '@mono/client:'
    __webpack_require__.l = function (url, done, key, chunkId) {
      // loadScript function to load a script via script tag
      if (inProgress[url]) {
        inProgress[url].push(done)
        return
      }
      if (inProgress[url]) {
        inProgress[url].push(done)
        return
      }
      var script, needAttach
      if (key !== undefined) {
        var scripts = document.getElementsByTagName('script')
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i]
          if (
            s.getAttribute('src') == url ||
            s.getAttribute('data-webpack') == dataWebpackPrefix + key
          ) {
            script = s
            break
          }
        }
      }
      if (!script) {
        needAttach = true
        script = document.createElement('script')
        script.charset = 'utf-8'
        script.timeout = 120
        if (__webpack_require__.nc) {
          script.setAttribute('nonce', __webpack_require__.nc)
        }
        script.setAttribute('data-webpack', dataWebpackPrefix + key)
        script.src = url
      }
    }

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0
      if (chunkIds.some(id => installedChunks[id] !== 0)) {
        for (moduleId in moreModules) {
          if (__webpack_require__.o(moreModules, moduleId)) {
            __webpack_require__.m[moduleId] = moreModules[moduleId]
          }
        }
        if (runtime) var result = runtime(__webpack_require__)
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data)
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i]
        if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          installedChunks[chunkId][0]()
        }
        installedChunks[chunkId] = 0
      }
    }

    var chunkLoadingGlobal = (self['webpackChunk_mono_client'] =
      self['webpackChunk_mono_client'] || [])
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0))
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    )
  })()
  /* webpack/runtime/jsonp chunk loading */
  ;(() => {
    // object to store loaded and loading chunks
    // undefined = chunk not loaded, null = chunk preloaded/prefetched
    // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    var installedChunks = {
      main: 0
      //   sum: [resolve, reject]
    }
    // 声明一个
    var installedChunkData = installedChunks[chunkId]
    // 通过jsonp异步加载chunkId，也就是异步的那个模块。
    __webpack_require__.f.j = function (chunkId, promises) {
      var promise = new Promise(
        (resolve, reject) =>
          (installedChunkData = installedChunks[chunkId] = [resolve, reject])
      )
      //   数组里面第三个属性是这个promise
      promises.push((installedChunkData[2] = promise))

      // start chunk loading。p是publicPath.返回值是代码块的路径
      var url = __webpack_require__.p + __webpack_require__.u(chunkId)
    }
  })()

  // 异步去加载hello代码块，然后把hello代码块里的模块定义合并到主模块定义去。、
  // 然后再去加载这个模块，然后去执行这个模块
  __webpack_require__
    .e(/*! import() */ 'src_sum_ts')
    .then(
      __webpack_require__.bind(__webpack_require__, /*! ./sum */ './src/sum.ts')
    )
    .then(res => console.log(res))
})()
