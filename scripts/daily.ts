import request from 'request'
import querystring from 'querystring'

const enum MessageType {
  First = 'first',
  Last = 'last'
}
interface Message {
  title: string
  content: string
}

const ReminderMessage: Record<MessageType, Message> = {
  [MessageType.First]: {
    title: '一日之计在于晨',
    content: '每好的一天从一道算法题开始吧'
  },
  [MessageType.Last]: {
    title: '吾日三省吾身',
    content: `
      - 今天的题写多了吗？
      - 相关知识点掌握了吗？
      - 遇到相同类型的题目还会吗？
    `
  }
}

const args = process.argv.slice(2)

const reminder = async () => {
  try {
    const type = args[0] as MessageType
    const sendKey = args[1]
    const message = ReminderMessage[type]
    if (!message || !sendKey) {
      return
    }

    let url = `https://sctapi.ftqq.com/${sendKey}.send?title=${querystring.escape(
      message.title
    )}&desp=${querystring.escape(message.content)}`

    await request.post(url)
  } catch (e) {
    console.log('[Error]: ', e)
  }
}

reminder()
