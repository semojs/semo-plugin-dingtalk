import { Utils } from '@semo/core'
import { api } from 'semo-plugin-api'
import crypto from 'crypto'

const API = api('semo-plugin-dingtalk')
const debug = Utils.debug('semo-plugin-dingtalk')

export class DingBot {
  protected token: string
  protected secret: string
  protected dryRun: boolean
  protected timestamp: number

  constructor(token, secret = '', dryRun = false) {
    this.token = token
    this.dryRun = dryRun
    this.secret = secret
    this.timestamp = Date.now()
  }

  /**
   * Sign secret
   * 
   * If secret is null, it will ignore and return null
   */
  private sign() {
    let secret = this.secret

    if (!secret) {
      return null
    }

    let hmac = crypto.createHmac('sha256', secret).update(this.timestamp + '\n' + secret, 'utf8')
    return encodeURIComponent(hmac.digest('base64'))
  }

  /**
   * Send to DingTalk by options
   * 
   * @param options 
   */
  public async send(options) {
    let sign = this.sign()
    let url
    if (!sign) {
      url = `https://oapi.dingtalk.com/robot/send?access_token=${this.token}`
    } else {
      url = `https://oapi.dingtalk.com/robot/send?access_token=${this.token}&timestamp=${this.timestamp}&sign=${sign}`
    }

    if (this.dryRun) {
      debug('Dry Run Options:', options)
    } else {
      await API.post(url, options)
    }
  }

  /**
   * Send ActionCard type to DingTalk
   * 
   * @param obj.title Message title
   * @param obj.text Message text
   * @param obj.btnOrientation Message btn orientation, 0 means horizon, 1 means vertical
   * @param obj.btns Message btns, format is TITLE|LINK
   * @param obj.singleTitle Single btn title, if exist, ignore obj.btns
   * @param obj.singleUrl Single btn URL
   */
  public async sendActionCard({ title, text, btnOrientation, btns, singleTitle, singleUrl }) {
    await this.send({
      actionCard: {
        title: title, 
        text: text,
        btnOrientation: btnOrientation ? '1': '0', 
        btns: btns ? btns.map(line => {
          const split = line.split('|')
          return {
            title: split[0] || '',
            actionURL: split[1] || ''
          }
        }) : [],
        singleTitle: singleTitle,
        singleURL: singleUrl
      }, 
      msgtype: "actionCard"
    })
  }

  /**
   * Send FeedCard type to DingTalk
   * 
   * @param obj.links array, format is TITLE|MESSAGE_URL|PIC_URL 
   */
  public async sendFeedCard({ links }) {
    await this.send({
      "feedCard": {
        "links": links ? links.map(line => {
          const split = line.split('|')
          return {
            title: split[0] || '',
            messageURL: split[1] || '',
            picURL: split[2] || ''
          }
        }) : [],
      }, 
      "msgtype": "feedCard"
    })
  }

  /**
   * Send link type to DingTalk
   * @param obj.title Message title
   * @param obj.text Message text, markdown syntax
   * @param obj.messageUrl Message Url
   * @param obj.picUrl Message picUrl
   */
  public async sendLink({ title, text, messageUrl, picUrl }) {
    await this.send({
      msgtype: 'link',
      link: {
        title,
        text,
        messageUrl,
        picUrl,
      },
    })
  }

  /**
   * Send Markdown type to DingTalk
   * 
   * @param obj.title Message title
   * @param obj.text Message text in group, markdown syntax
   * @param obj.at notify a group member
   * @param obj.atAll notify all 
   */
  public async sendMarkdown({ title, text, at = undefined, atAll = false }) {
    await this.send({
      msgtype: 'markdown',
      markdown: {
        title,
        text
      },
      at: {
        atMobiles: at, 
        isAtAll: atAll
      }
    })
  }

  /**
   * Send Text type to DingTalk
   * 
   * @param obj.content send content
   * @param obj.at notify a group member
   * @param obj.atAll notify all 
   */
  public async sendText({ content, at = undefined, atAll = false }) {
    await this.send({
      msgtype: 'text',
      text: {
        content
      },
      at: {
        atMobiles: at, 
        isAtAll: atAll
      }
    })
  }
}
