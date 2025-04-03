const requireModule = import.meta.globEager('./*/*.js')
const modules = {}

/* 모듈 병합 */
Object.keys(requireModule).forEach((fileName) => {
  // Avoid the index.js file
  if (fileName === './index.js') {
    return
  }
  const name = fileName.replace(/(\.\/|\.js)/g, '')
  const moduleName = camelCase(last(name.split('/')))
  modules[moduleName] = requireModule[fileName].default
})

function camelCase(value) {
  // TODO: apply lodash camelCase
  return value
}

function last(list=[]) {
  return Array.isArray(list)
    ? list[list.length - 1]
    : ''
}

export default modules