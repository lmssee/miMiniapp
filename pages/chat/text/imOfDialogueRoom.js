/** 与 im 相关的函数 */
import heightOfDialogueRoom from './heightOfDialogueRoom';
import time from '../../../commons/time';
import {
  emojiUrl,
  emojiMap
} from "../../../commons/emojiMap";

const imOfDialogueRoom = {
    /**  获取消息列表 */
    getMessageList(that) {
      wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_RECEIVED, that.MessageReceived);
      wx.$_tim.getMessageList({
        conversationID: `C2C${that.data.friendId}`, //会话列表传递过来的参数
        count: 15
      }).then((imResponse) => {
        let messages = that.alterMessage(imResponse.data.messageList, 1); // 消息列表。
        that.setData({
          nextReqMessageID: imResponse.data.nextReqMessageID, // 用于续拉，分页续拉时需传入该字段。
          isCompleted: imResponse.data.isCompleted, // 表示是否已经拉完所有消息。
          messages
        });
        that.scrollToBottom();
      });
    },
    /** 发送消息 */
    sendMsg(e,that) {
      if (that.data.content == "") {
        wx.showToast({
          title: '请输入内容',
          duration: 1000,
          icon: 'none'
        });
        return;
      }
      let msg = wx.$_tim.createTextMessage({
        to: that.data.friendId,
        conversationType: wx.$_TIM.TYPES.CONV_C2C,
        payload: {
          text: that.data.content
        }
      });
      //  发送消息
      wx.$_tim.sendMessage(msg, {
        offlinePushInfo: {
          /** 如果对方不在线，则消息将存入漫游，且进行离线推送 */
          title: '您有新的离线消息',
          description: msg,
          /** 离线推送设置 OPPO 手机 8.0 系统以上的渠道 ID */
          androidOPPOChannelID: ''
        }
      }).then((imResponse) => {
        that.addMessage([imResponse.data.message])
        that.setData({
          sendBtn: true
        })
      }).catch((imError) => {});
    },
    /**  发送图片消息 */
    sendImg(that) {
      wx.chooseImage({
        sourceType: ['album', 'camera'], // 从相册选择
        count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
        success: (res) => {
          let msg = wx.$_tim.createImageMessage({
            to: that.data.friendId,
            conversationType: wx.$_TIM.TYPES.CONV_C2C,
            payload: {
              file: res
            },
            onProgress: (e) =>
              console.log('图片', e)
          });
          wx.$_tim.sendMessage(msg, {
            offlinePushInfo: {
              /** 如果对方不在线，则消息将存入漫游，且进行离线推送 */
              title: '您有新的离线消息',
              description: '图片消息，请在客户端浏览',
              /** 离线推送设置 OPPO 手机 8.0 系统以上的渠道 ID */
              androidOPPOChannelID: ''
            }
          }).then(imResponse => {
            that.addMessage([imResponse.data.message]);
            that.moreClick();
          });
        }
      })
    },
  /*** 发送视频消息 */
  sendVedio(that) {
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // 从相册选择
      maxDuration: 35,
      camera: 'back',
      success: (res) => {
        if (res.duration > 35) {
          wx.showModal({
            cancelColor: 'cancelColor',
            title: '提示',
            content: '您好，您选择的视频时长大于 35 秒（s），请重新选择或进行剪辑',
            showCancel: false,
            confirmText: '已知晓',
          });
          return;
        }
        let msg = wx.$_tim.createVideoMessage({
          to: that.data.friendId,
          conversationType: wx.$_TIM.TYPES.CONV_C2C,
          payload: {
            file: res
          },
          onProgress: (e) => {
            console.log('视频', e);
          }
        });
        wx.$_tim.sendMessage(msg, {
          offlinePushInfo: {
            /** 如果对方不在线，则消息将存入漫游，且进行离线推送 */
            title: '您有新的离线消息',
            description: '视频消息，请在客户端浏览',
            /** 离线推送设置 OPPO 手机 8.0 系统以上的渠道 ID */
            androidOPPOChannelID: ''
          }
        }).then(imResponse => {
          // 发送成功
          that.addMessage([imResponse.data.message]);
        });
      }
    });
  },
    /** 刷新文本消息 */
    addMessage(msg, getNewMessage = false,that) {
      var messages = that.data.messages;
      messages = messages.concat(that.alterMessage(msg, 2));
      if (getNewMessage == true && that.data.isInBottom == true) {
        that.setData({
          messages,
        });
        that.scrollToBottom();
      } else if (getNewMessage == true && that.data.isInBottom == false) {
        that.setData({
          newMessageButnoInBottom: true,
          newMessageInBottomShow: ++that.data.newMessageInBottomShow
        });
      } else {
        that.setData({
          messages,
          content: '' // 清空输入框文本
        })
        that.scrollToBottom();
      }
    },
  /*** 滚动到底部并设置已读 */
  scrollToBottomAndRead(that) {
    that.setData({
      newMessageButnoInBottom: false,
      messages: that.data.messages,
      newMessageInBottomShow: 0
    });
    that.scrollToBottom();
  },
  /** 滚到到底部 */
  scrollToBottom(that) {
    that.setData({
      scrollWithAnimation: true,
    });
    setTimeout(() => {
      that.setData({
        isInBottom: true,
        toView: 'row_' + (that.data.messages.length - 1)
      });
      wx.$_tim.setMessageRead({
        conversationID: `C2C${that.data.friendId}`
      });
    }, 3);
    setTimeout(() => {
      that.setData({
        scrollWithAnimation: false,
      });
    }, 80);
  },
  /*** 消息下拉刷新 */
  refresh(e, that) {
    if (that.data.ScrollLoading == 1) { //防止多次触发
      return false
    }
    if (e.detail.scrollTop < 1) {
      if (that.data.isCompleted == true) {
        fn.showInfo('已加载全部', 0, 450);
        return;
      }
      that.data.ScrollLoading = 1;
      wx.showLoading({
        title: '加载中',
      });
      setTimeout(() => {
        wx.$_tim.getMessageList({
          conversationID: `C2C${that.data.friendId}`,
          nextReqMessageID: that.data.nextReqMessageID,
          count: 7
        }).then((imResponse) => {
          that.setData({
            nextReqMessageID: imResponse.data.nextReqMessageID, // 用于续拉，分页续拉时需传入该字段。
            isCompleted: imResponse.data.isCompleted, // 表示是否已经拉完所有消息。
            messages: that.alterMessage(imResponse.data.messageList, 3).concat(that.data.messages), // 消息列表。
            toView: 'row_' + (imResponse.data.messageList.length - 1) // 滚动到消息的某一处
          })
        }).finally(() => {
          wx.hideLoading();
          that.data.ScrollLoading = -1;
        });
      }, 300);
    } else if (e.detail.scrollTop > e.detail.scrollHeight - that.data.windowheight + 282) {
      that.setData({
        isInBottom: true
      })
    } else {
      that.setData({
        isInBottom: false
      });
    }
  },
  /** 消息处理 */
  alterMessage(messages, n, that) {
    const lastTimeOfTime = 300;
    for (let i = 0, j = messages.length; i < j; i++) {
      /*** 时间戳显示 */
      if (n == 1) {
        /** 首次拉取，最顶端显示时间戳 */
        if (i == 0)
          messages[0].showTimeInfo = time.dialogueListShowTime(messages[0].time, true);
        else if (messages[i].time - messages[i - 1].time > lastTimeOfTime)
          messages[i].showTimeInfo = time.dialogueListShowTime(messages[i].time, true);
      } else if (n == 2) {
        /** 发送消息回显 */
        if (messages[0].time - that.data.messages[that.data.messages.length - 1].time > lastTimeOfTime) {
          messages[0].showTimeInfo = time.dialogueListShowTime(messages[0].time, true);
        }
      } else if (n == 3) {
        // 续拉旧数据
        if (i == 0)
          messages[0].showTimeInfo = time.dialogueListShowTime(messages[0].time, true);
        else if (messages[i].time - messages[i - 1].time > lastTimeOfTime)
          messages[i].showTimeInfo = time.dialogueListShowTime(messages[i].time, true);
        if (i == j - 1 && messages[i].time - that.data.messages[0].time <= lastTimeOfTime)
          that.data.messages[0].showTimeInfo = '';
      }
      /** 视频消息的处理 */
      if (messages[i].type == "TIMVideoFileElem") {
        /** 时长转化 */
        if (messages[i].payload.videoSecondShow != '') {
          let time = messages[i].payload.videoSecond;
          messages[i].payload.videoSecondShow = time < 1 ? '00:00' : (time < 10 ? `00:0${time}` : `00:${time}`);
        }
        /** 宽高设定 */
        let width = messages[i].payload.thumbWidth || 400;
        let height = messages[i].payload.thumbHeight || 712;
        let linWeight = width > 600 ? 600 : width > 400 ? width : 400;
        messages[i].payload.thumbWidth = linWeight;
        messages[i].payload.thumbHeight = linWeight * height / width;
      }
      /** 图片消息处理 */
      else if (messages[i].type == 'TIMImageElem') {
        let width = messages[i].payload.thumbWidth || 400;
        let height = messages[i].payload.thumbHeight || 712;
        let linWeight = width > 600 ? 600 : width > 400 ? width : 400;
        messages[i].payload.thumbWidth = linWeight;
        messages[i].payload.thumbHeight = linWeight * height / width;
      } else if (messages[i].type === 'TIMTextElem') {
        const renderDom = []
        let temp = messages[i].payload.text
        let left = -1
        let right = -1
        while (temp !== '') {
          left = temp.indexOf('[')
          right = temp.indexOf(']')
          switch (left) {
            case 0:
              if (right === -1) {
                renderDom.push({
                  name: 'span',
                  text: temp,
                })
                temp = ''
              } else {
                const _emoji = temp.slice(0, right + 1)
                if (emojiMap[_emoji]) {
                  renderDom.push({
                    name: 'img',
                    src: emojiUrl + emojiMap[_emoji],
                  })
                  temp = temp.substring(right + 1)
                } else {
                  renderDom.push({
                    name: 'span',
                    text: '[',
                  })
                  temp = temp.slice(1)
                }
              }
              break
            case -1:
              renderDom.push({
                name: 'span',
                text: temp,
              })
              temp = ''
              break
            default:
              renderDom.push({
                name: 'span',
                text: temp.slice(0, left),
              })
              temp = temp.substring(left)
              break
          }
        }
        messages[i].textShow = renderDom;
      }
    }
    return messages;
  }
};
export default imOfDialogueRoom;