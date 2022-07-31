Component({
  behaviors: [mixins],

  properties: {
    myProperty: { // 属性名
      type: String,
      value: ''
    },
    myProperty2: {
      type: Array,
      value: () => []
    } // 简化的定义方式
  },
  
  data: {
    test: 1,
    lifetimes: {

    }
  }, // 私有数据，可用于模板渲染


  detached: function () { },
  ready: function() {
    console.log('ready')
  },

  methods: {
    // attached: 
    onMyButtonTap: function(){
      this.setData({
        test: 2,
        test: 2,
        test: 2
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
      const { test } = this.data
      const user = this.data.user
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        test: 2
      })
      wx.showToast({
        title: 'title'
      })
    },
    _propertyChange: function(newVal, oldVal) {

    }
  }
})