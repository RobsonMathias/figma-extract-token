const debounce = callback =>
  new Promise(res => {
    callback()
    setTimeout(() => {
      res()
    }, 500)
  })

module.exports = debounce
