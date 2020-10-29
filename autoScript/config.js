module.exports = {
  name: 'vue-app',
  env: {
    dev: { name: '开发）', cmd: 'build:dev' },
    pre: { name: '准生产）', cmd: 'build:pre' },
    prod: { name: '生产）', cmd: 'build:prod' },
  },
  //工单
  order: {
    name: '自动化打包push',
    branch: 'reset',
    value: [
      {
        key: '工单号',
        describe: '自动化打包push'
      }
    ]
  }
}
