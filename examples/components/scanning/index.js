import zmconfig from '../common/config'
const a = {
  test: 1
}
Component({
  data: {
    hwCloudUrl: '',
    cameraFlash: false
  },
  lifetimes: {
    attached: function() {
      this.setData({ hwCloudUrl: zmconfig.hwCloudUrl }); // 设置图片baseUrl
    },
    ready: function() {
    	const b = 2;
    },
    created: function() {
      const a = 1;
    },
    detached: function() {
      const a = 1;
    }
  },
  methods: {
    // 扫码结果返回
    scanCode(event) {
      this.triggerEvent('scancode', event);
    },
    // 闪光灯开关
    flashTap() {
      const cameraFlash = !this.data.cameraFlash;
      this.setData({ cameraFlash })
    }
  }
})
