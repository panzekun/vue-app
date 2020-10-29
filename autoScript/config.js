module.exports = {
  name: 'vue-app',
  env: {
    dev: { name: '开发）', cmd: 'build:dev' },
    pre: { name: '准生产）', cmd: 'build:pre' },
    prod: { name: '生产）', cmd: 'build:prod' },
  },
  //工单
  order: {
    name: '测试自动push代码',
    branch: 'reset',
    value: [
      {
        key: '工单号',
        describe: '测试自动push代码'
      }
    ]
  }
}
