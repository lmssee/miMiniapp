let getTime, setBar;
Page({
  data: {
    list: [],
    idS: {},
    order: {},
    allPrice: 0,
    allCum:0,
    /*** 右侧节点信息，用于设置左侧特定样式 */
    nodeDetail: [],
    /** 设定右侧的滚动 */
    scrollToTheList: '',
    /** 用于设定左侧的特定样式 */
    whoInView: 0,
  },
  /** 由于是首页，跳转其他页面后存在于栈中，仅触发一次  */
  onLoad: function (options) {
    /** 清除无效储存，否则会导致报错 */
    wx.removeStorageSync('storeDetailPage');
    wx.getStorage({
      key: 'order',
      complete: (d) => {
        this.data.order = d.data ? d.data : {};
        this.getlist();
      }
    })
  },
  onReady: function () {
    console.log(123);
    /** 获取 list 高度 */
    getTime = setInterval(() => {
      if (this.data.list.length > 0) {
        for (let i = 0; i < this.data.list.length; i++) {
          wx.createSelectorQuery().select(`#a${this.data.list[i]._id}`).fields({
            size: true,
            scrollOffset: true,
            properties: ['scrollX', 'scrollY'],
            computedStyle: ['margin', 'backgroundColor'],
            context: true,
          }, (res) => {
            if (this.data.nodeDetail.length > 0) {
              this.data.nodeDetail.push({
                h: res.height,
                t: this.data.nodeDetail[this.data.nodeDetail.length - 1].h + this.data.nodeDetail[this.data.nodeDetail.length - 1].t
              })
            } else {
              this.data.nodeDetail.push({
                h: res.height,
                t: 0
              })
            }
          }).exec();
        }
        clearInterval(getTime);
        getTime = null;
      }
    }, 300);
  },
  onShow: function () {
    /** 周期更改左侧目录树，比监听 srolling 效果好多了 */
    setBar = setInterval(() => {
      wx.createSelectorQuery().select('#ringhtContent').scrollOffset(
        (r) => {
          this.checkLeftTitle(r.scrollTop);
        }
      ).exec();
    }, 20);
    /** 从详情页返回时查看并设置新的订单 */
    let a = wx.getStorageSync('storeDetailPage');
    let id = a._id;
    if (a) {
      let ii = this.data.idS[id].ii,
        jj = this.data.idS[id].jj,
        d = {
          [`list[${ii}].items[${jj}].cum`]:a.cum
        };
        this.allpriceChange(a.cum - this.data.list[ii].items[jj].cum ,a.price)
      this.data.order = wx.getStorageSync('order');
      /** 控制台可打印出 idS 信息，但是却无法获取 idS 信息 （异步） */
      this.setData(d);
    }
  },
  onHide: function () {
    clearTimeout(setBar);
    clearInterval(setBar);
    setBar = null;
  },
  onUnload: function () {
    clearTimeout(setBar);
    clearInterval(setBar);
    setBar = null;
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  getlist() {
    wx.request({
      url: "https://lmssee.cn:3000/case/commos/users",
      method: "GET",
      success: (r) => {
        r.data.map(i => {
          i.items.map(j => {
            j.img[0] = j.img[0].replace(/\\/img, '/').replace(/static/img, 'https:\/\/lmssee.cn:3000');
            j.cum = 0;
          })
        })
        this.setData({
          list: r.data
        })
        for (let ii = 0; ii < this.data.list.length; ii++) {
          for (let jj = 0; jj < this.data.list[ii].items.length; jj++) {
            this.data.idS[this.data.list[ii].items[jj]['_id']] = {
              ii: ii,
              jj: jj
            }
          }
        }
        /** 捕捉订单，并设置初始化数量 */
        let keys = Object.keys(this.data.order);
        for (let i = 0; i < keys.length; i++) {
          if (this.data.idS[keys[i]]) {
            this.data.order[keys[i]].ii = this.data.idS[keys[i]].ii;
            this.data.order[keys[i]].jj = this.data.idS[keys[i]].jj;
            let d = `list[${ this.data.idS[keys[i]].ii}].items[${this.data.idS[keys[i]].jj}].cum`,
              y = {
                [d]: this.data.order[keys[i]].cum
              };
              this.allpriceChange(this.data.order[keys[i]].cum,this.data.order[keys[i]].price);
            this.setData(y);
          } else {
            /** 防止商品信息变动导致商品失效 */
            this.data.order[keys[i]].S = -1;
          }
        }
        wx.setStorage({
          key: 'order',
          data: this.data.order
        })

      }
    })
  },
  /** * ++ */
  addCum(e) {
    this.changenum(e, +1);
  },
  /** * -- */
  reduceCum(e) {
    this.changenum(e, -1);
  },
  changenum(e, z) {
    let o = e.currentTarget.dataset,
      a = o.a,
      b = o.b,
      c = o.c,
      d = `list[${b}].items[${c}].cum`,
      y = {
        [d]: this.data.list[b].items[c].cum + z
      },
      id = a._id;
    this.setData(y);
    this.allpriceChange(z,a.price);
    if (this.data.list[b].items[c].cum != 0) {
      this.data.order[id] = this.data.list[b].items[c];
      this.data.order[id].ii = b;
      this.data.order[id].jj = c;
    } else {
      delete this.data.order[id];
    }
    wx.setStorage({
      key: 'order',
      data: this.data.order
    })
  },
  /** 跳转详情页 */
  gotoStoreDetail(e) {
    wx.setStorage({
      key: 'storeDetailPage',
      data: e.currentTarget.dataset.a,
      success: () => {
        wx.navigateTo({
          url: '/pages/store/home/list/list',
        })
      }
    })
  },
  scrollTo(e) {
    this.setData({
      scrollToTheList: e.currentTarget.dataset.a
    })
  },
  /** 滚动时设置左侧对应类样式 */
  checkLeftTitle(e) {
    for (let i = 0; i < this.data.nodeDetail.length; i++) {
      if (e > this.data.nodeDetail[i].t && e < this.data.nodeDetail[i + 1].t) {
        if (this.data.whoInView != i)
          this.setData({
            whoInView: i
          })
        break;
      }
    }
  },
  allpriceChange(n, p) {
    this.setData({
      allPrice: this.data.allPrice + n * p,
      allCum:this.data.allCum + n*1
    })
  }
})