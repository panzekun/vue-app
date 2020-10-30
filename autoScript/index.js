const shell = require('shelljs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const config = require('./config')
class Build {
  constructor() {
    //文件名
    this.projectName = config.name;
    //分支名
    this.branchName = "";
    //当前分支的 commit
    this.commitId = null;
    //环境
    this.envList = [];
    this.selectedEnvList = null;
    //推送的分支
    this.pushBranch = null;
    this.versionRule = null;
    this.remarks = null;
    this.initEnvList()
    this.beforeBuild()
  }
  initEnvList() {
    const {
      env
    } = config
    this.envList = Object.keys(env).map(key => {
      const arr = key.split(',')
      return {
        name: arr.map(v => `${env[v].name}:${v}`).join(' 和 '),
        value: arr.map(v => ({
          branch: v,
          ...env[v]
        }))
      }
    })
  }
  /* 分支比较 */
  beforeBuild() {
    const index = shell.exec(`git status`, {
      silent: true
    }).stdout.replace(/[\r\n]/g, '').indexOf('modified')
    if (index > 0) return console.log(chalk.bgHex('#FF0000').underline('---请先提交代码---'));
    /*  获取当前分支名 */
    const branchObj = shell.exec(`git symbolic-ref --short -q HEAD`, {
      // silent: Do not echo program output to console (default: false)
      silent: true
    })
    this.branchName = branchObj.stdout.replace(/[\r\n]/g, '')
    this.commitId = shell.exec(`git rev-parse --short HEAD`, {
      silent: true
    }).stdout.replace(/[\r\n]/g, '')
    /* 判断本地分支和远程分支的 commit 是否相等 */
    const res2 = shell.exec(`git branch -a -v`, {
      silent: true
    })
    const arr1 = res2.stdout.replace(/[\r\n]/g, ',').split(',') // 转成数组方便处理
    const arr2 = arr1.filter(item => item.includes(this.branchName)) // 初步分支名过滤
    const arr3 = arr2.map(item => item.split(' ').filter(ele => !!ele && ele !== '*')).flat(Infinity) // 空值和特殊值过滤并拍平

    if (this.commitId !== arr3[1]) {
      console.log(chalk.bgHex('#FF0000').underline('---代码未更新,请先更新---'))
    } else {
      this.chooseEnv()
    }
  }
  /* 选择环境 */
  async chooseEnv() {
    const promptList = [{
      type: 'list',
      message: '请选择环境：',
      name: 'env',
      choices: this.envList
    }]
    const {
      env
    } = await inquirer.prompt(promptList)
    this.selectedEnvList = env
    this.chooseVersion()
  }
  /* 选择版本 */
  async chooseVersion() {
    this.pushBranch = this.selectedEnvList[0].branch
    if (this.pushBranch === "dev") return this.chooseCommit()
    const promptList = [{
      type: 'list',
      message: '请选择版本和版本规则：',
      name: 'versionRule',
      choices: [{
          name: '常规版本: b位+1',
          value: 'b'
        },
        {
          name: '紧急版本: c位+1',
          value: 'c'
        },
        {
          name: '大的重构或者功能上线: a位+1',
          value: 'a'
        },
        {
          name: '版本号不变',
          value: 'none'
        },
        {
          name: '后面单独根据实际的版本号再决定',
          value: ''
        }
      ]
    }]
    const {
      versionRule
    } = await inquirer.prompt(promptList)
    this.versionRule = versionRule
    this.chooseCommit()
  }
  /* 选择git commit的备注 */
  async chooseCommit() {
    const {
      order
    } = config
    const promptList = [{
        type: 'list',
        message: '请选择git commit的备注：',
        name: 'remarks',
        choices: [`${order.name} ${this.pushBranch}发版`, '自定义']
      },
      {
        type: 'input',
        message: '请输入git commit的备注：',
        name: 'newRemarks',
        when: function (answers) {
          return answers.remarks === '自定义'
        },
        validate: function (val) {
          return val.trim() ? true : '请输入备注'
        }
      }
    ]
    const {
      remarks,
      newRemarks
    } = await inquirer.prompt(promptList)
    this.remarks = newRemarks || remarks
    this.checkAgain()
  }
  /* 再次确认 */
  async checkAgain() {
    const promptList = [{
      type: 'list',
      message: '请再次确认信息是否正确',
      name: 'is',
      choices: [{
          name: '是, 开始构建',
          value: true
        },
        {
          name: '否, 重新选择',
          value: false
        }
      ]
    }]
    const {
      is
    } = await inquirer.prompt(promptList)
    is ? this.runBuild() : this.chooseEnv()
  }
  runBuild() {
    if (this.selectedEnvList.length <= 0) {
      return console.log(chalk.green('所有任务构建成功'))
    } else {
      console.log(chalk.blueBright('开始构建'))
    }
    this.targetEnv = this.selectedEnvList[0]
    if (shell.exec(`npm run ${this.targetEnv.cmd}`).code !== 0) shell.exit(1)
    this.switchBranch()
  }
  /* 切换分支 */
  switchBranch() {
    // 切换分支并更新代码
    shell.exec(`git checkout ${ this.pushBranch}`)
    shell.exec(`git pull origin ${ this.pushBranch}`) //更新一下，防止不是最新的代码
    shell.cp('-r', 'dist/*', `${this.projectName}`) // 复制粘贴文件
    // shell.rm('-r', 'dist/*'); //删除文件
    this.editVersion()
  }
  /* 修改版本号 */
  async editVersion() {
    if (this.pushBranch === "dev") return this.runGit()
    const {
      stdout
    } = shell.cat(`${this.projectName}/healthcheck.html`)
    const str = stdout
      .split('<br/>')
      .find(item => item.includes('project.version'))
      .split('=')[1]
      .trim()
    const arr = str
      .replace('v', '')
      .split('.')
      .map(v => Number(v))
    console.log('arr修改版本号',arr);
    let newStr = ''
    switch (this.versionRule) {
      case 'a':
        newStr = `v${arr[0] + 1}.0.0`
        break
      case 'b':
        newStr = `v${arr[0]}.${arr[1] + 1}.0`
        break
      case 'c':
        newStr = `v${arr[0]}.${arr[1]}.${arr[2] + 1}`
        break
      case 'none':
        newStr = `v${arr[0]}.${arr[1]}.${arr[2]}`
        break
      default: {
        const promptList = [{
          type: 'input',
          message: '请输入版本号,如1.0.0',
          name: 'version',
          suffix: `当前版本号v${arr[0]}.${arr[1]}.${arr[2]}`,
          validate: function (val) {
            return val.trim() ? true : '请输入版本号'
          }
        }]
        const {
          version
        } = await inquirer.prompt(promptList)
        newStr = `v${version}`
      }
    }
    const [file] = shell.ls(`${this.projectName}/healthcheck.html`)

    shell.sed('-i', str, newStr, file)
    this.runGit()
  }
  /* 推送到远程 */
  async runGit() {
    const name = this.targetEnv.name
    const remarks = this.remarks.replace('“环境名”', name)
    shell.exec('git add -A')
    shell.exec(`git commit -m "${remarks}"`)
    shell.exec(`git push origin ${this.pushBranch}`)
    //切回原分支
    shell.exec(`git checkout ${this.branchName}`)
    this.selectedEnvList.shift()
    this.runBuild()
  }
}

new Build()