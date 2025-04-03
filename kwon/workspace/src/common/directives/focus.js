export const focus = {
  bind(el) {
    console.log(el)
    el.addEventListener('focusin', function() {
      document.body.classList.add('form-focus')
      console.log('focusin')
    })
    el.addEventListener('blur', function() {
      document.body.classList.remove('form-focus')
      console.log('blur')
    })
  },
  unbind(el) {
    console.log(el)
    el.removeEventListener('focusin', function() {})
    el.removeEventListener('blur', function() {})
  },
}