module.exports = {
  path: 'post',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Post'))
    })
  }
}