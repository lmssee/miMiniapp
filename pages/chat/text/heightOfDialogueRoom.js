/** 调控页面高度 */
const heightOfDialogueRoom = {
  /** 输入框回收 */
  _setInputScroll(that) {
    if (!that.data.expressionShow) {
      that.data.expressionShow = true;
      that.expressionShowClick();
    } else if (!that.data.moreShow) {
      that.data.moreShow = true;
      that.moreClick();
    } else {
      that.setData({
        moreShow: true,
        expressionShow: true,
        replyBottom: 22,
        scrollHeight: that.data.windowheight - 275
      });
      that.scrollToBottom();
    }
  },
  /**  获取焦点 */
  inputOnFocus(that) {
    that.setData({
      moreShow: true,
      expressionShow: true,
    })
    that.scrollToBottom();
  },
    /** 点击更多 */
    moreClick(that) {
      if (that.data.moreShow) {
        that.setData({
          moreShow: false,
          expressionShow: true,
          replyBottom: 200,
          scrollHeight: that.data.windowheight - 453
        });
      } else {
        that.setData({
          moreShow: true,
          expressionShow: true,
          replyBottom: 22,
          scrollHeight: that.data.windowheight - 275
        });
      }
      that.scrollToBottom();
    },
  /** 表情框拉起或回收 */
  expressionShowClick(that) {
    if (that.data.expressionShow) {
      that.setData({
        expressionShow: false,
        moreShow: true,
        replyBottom: 333,
        scrollHeight: that.data.windowheight - 590
      });
    } else {
      that.setData({
        moreShow: true,
        expressionShow: true,
        replyBottom: 22,
        scrollHeight: that.data.windowheight - 275
      });
    }
    that.scrollToBottom();
  }
};
export default heightOfDialogueRoom;