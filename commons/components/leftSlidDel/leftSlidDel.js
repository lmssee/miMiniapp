// commons/components/leftSlidright/leftSlidright.js
let time, clearTime;
Component({
  options: {
    /** 允许多个 slot  */
    multipleSlots: true,
    /** 样式限定 */
    styleIsolation: 'apply-shared',
    /** 外部样式 */
    // addGlobalClass: true,
    /** 指定纯数据字段，通过设置 pureDataPattern 属性值设定满足特殊设定的值为存数据字段 */
    // pureDataPattern: /^_/
  },
  /** 外部样式引入 */
  // externalClasses: [''],
  /*  注入外部导入函数  */
  behaviors: [],
  /** *
   * 使用 export 自定义导出内容 
   * 但必须现在 behaviors 中添加 'wx://component-export' 
   * export(){
   *    return {myFiled:'myValue'}
   *   },
   * */
  properties: {
    index: {
      type: Number,
      value: 0
    },
    leftText: {
      type: String,
      value: '复制'
    },
    rightText: {
      type: String,
      value: '删除'
    }
  },
  lifetimes: {
    attached() {
      this.createSelectorQuery().select('.Block').boundingClientRect(r => {
        this.setData({
          'rightLeft': r.width + 'px',
          'leftLeft': r.width + 'px',
          'leftWidth': r.width * 0.64 + 100 + 'px',
          'rightWidth': r.width * 0.32 + 100 + 'px',
          'left': r.width,
          'rightBC': '#f00',
          'leftBC': '#0f0',
          'bigLeft': r.width * 0.65
        });
      }).exec();
      this.createSelectorQuery().select('.move').boundingClientRect(r => {
        this.setData({
          'lastLeft': r.left
        })
      }).exec();
    },
    moved() {

    },
    detached() {

    }
  },
  /* 在组件中周期函数 */
  pageLifetimes: {
    show() {

    },
    hide() {

    },
    resize() {

    }
  },
  data: {
    left: 0,
    leftWidth: 0,
    leftLeft: 0,
    leftBC: '',
    rightWidth: 0,
    rightLeft: 0,
    rightBC: '',
    lastLeft: 0,
    bigLeft: 0,
    scrollLeft: 0,
    start: 0,
    end: 0
  },
  methods: {
    click(e) {
      /** 
       * 通过 this.triggerEvent 反射数据给父组件，
       * 第一个参数为父组件绑定的事件名称
       * 第二个参数为返回的数据，被父组件 detail 捕获
       * 第三个参数是对象，设置该事件行为
       *    是否冒泡            bubbles
       *    是否穿透            composed
       *    是否发生在捕获      capturePhase
       */
      this.triggerEvent('click', {
        name: 123
      }, {
        bubbles: false,
        composed: false,
        capturePhase: true
      });
    },
    hmove(e) {
      this.setData({
        'rightLeft': (this.data.left + e.detail.scrollLeft / 2) + 'px',
      })
    },
    start(e) {
      this.createSelectorQuery().select('.move').boundingClientRect(r => {
        if (r.left < 0)
          this.data.start = this.data.bigLeft;
        else this.data.start = 0;
      }).exec();
    },
    end() {
      this.createSelectorQuery().select('.move').boundingClientRect(r => {
        if (this.data.start > 0) {
          this.setData({
            'scrollLeft': '0px'
          });
          this.data.start = 0;
        } else {
          if ((this.data.lastLeft - r.left) < this.data.bigLeft / 4) {
            this.setData({
              'scrollLeft': '0px'
            });
          } else {
            this.setData({
              'scrollLeft': this.data.bigLeft + 'px'
            });
          }
        }
      }).exec();

      /** 获取元素节点信息 */
      // p.selectViewport().fields({
      //   dataset: true,
      //   size: true,
      //   scrollOffset: true,
      //   properties: ['scrollX', 'scrollY'],
      //   computedStyle: ['margin', 'backgroundColor'],
      //   context: true,
      //   },r=>{
      //   console.log(r);
      // })

    },
    leftNow(e) {
    },
    rightNow(e) { },
    clickRight(e) {
      this.setData({
        'scrollLeft': 0 + 'px'
      });
      this.triggerEvent('rightClick', e.currentTarget.dataset.a);
    },
    clickLeft(e) {
      this.setData({
        'scrollLeft': 0 + 'px'
      });
      this.triggerEvent('leftClick', e.currentTarget.dataset.a);
    }
    /**  end methods  */
  }
})