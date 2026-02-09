import { exec } from 'child_process'
import { promisify } from 'util'
import { formatTime } from './time.js'

// 将exec转为Promise风格，方便async/await使用
const execAsync = promisify(exec)

// 生成带时间戳的标签名
const timeLine = formatTime(new Date(), 'yyyyMMddhhmmss')
const tagName = `test.${timeLine}`
// git打标签命令：-a是附注标签，-m是标签备注
const gitTagCmd = `git tag -a ${tagName} -m "Auto tag: ${tagName}"`
// 推送标签命令
const gitTagPushCmd = `git push origin ${tagName}`

/**
 * 执行打标签+推送标签的核心函数
 */
const exceTest = async () => {
  try {
    console.log('开始执行打标签命令 --> ', gitTagCmd)
    // 执行打标签命令
    const tagResult = await execAsync(gitTagCmd)
    console.log('打标签成功：', tagResult.stdout)

    console.log('开始推送标签 --> ', gitTagPushCmd)
    // 执行推送标签命令
    const pushResult = await execAsync(gitTagPushCmd)
    console.log('推送标签成功：', pushResult.stdout)

    console.log(`✅ 标签${tagName}已成功创建并推送，将触发CI/CD部署！`)
  } catch (error) {
    // 命令执行失败时捕获错误
    console.error('❌ 标签操作失败：', error.message)
    // 退出进程并标记失败，方便CI识别
    process.exit(1)
  }
}

// 执行函数
exceTest()