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

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
  attached: function () { }, // 此处 attached 的声明会被 lifetimes 字段中的声明覆盖
  ready: function() {
    console.log('ready')
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    // attached: 
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
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