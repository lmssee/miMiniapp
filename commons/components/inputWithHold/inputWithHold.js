// commons/components/inputWithHold/inputWithHold.js
Component({
  options: {

  },
  properties: {
    type: {
      type: String,
      value: "text"
    },
    holder: {
      type: String,
      value: "请输入"
    },
    value: {
      type: String,
      value: ""
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        'oldHolder': this.data.holder
      })
    }
  },
  data: {
    isAlterShow: false,
    oldHolder: ''
  },
  methods: {
    getValue(e) {
      this.setData({
        'value': e.detail.value
      })
      this.triggerEvent('getValue', e.detail.value)
    },
    onFocus() {
      this.setData({
        'isAlterShow': true,
        'holder': ''
      })
    },
    onBlur() {
      this.setData({
        "holder": this.data.oldHolder
      })
      this.triggerEvent('getValue', this.data.value)
      if (this.data.value == '') {
        this.setData({
          'isAlterShow': false
        })
      } else {
        this.setData({
          'isAlterShow': true
        })
      }
    },
    
    /** end methods */
  }
})
