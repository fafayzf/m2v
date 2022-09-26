<template>
	<div class="page">
	  <div class="zm-scanning">
	    <img class="camera-bg" :src="`${ hwCloudUrl }/scanning/scan-border.png`" />
	    <img class="scan-scroll" :src="`${ hwCloudUrl }/scanning/scan-scroll.png`" />
	    <div class="lighter-wrapper" @click="flashTap">
	      <span class="iconfont icon-electric-torch camera-lighter"></span>
	    </div>
	    <camera class="camera-area" mode="scanCode" device-position="back" :flash=" cameraFlash " @scancode="scanCode"></camera>
	  </div>
	</div>
</template>
<script>
	import zmconfig from '../common/config';
	const source = this.$createMediaAudioPlayer();
	const a = {
	  test: 1
	};
	export default {
	  components: {},

	  data() {
	    return {
	      hwCloudUrl: '',
	      cameraFlash: false
	    };
	  },

	  crated: function() {
	    const a = 1;
	  },

	  mounted() {
	    this.hwCloudUrl = zmconfig.hwCloudUrl;
	    this.hwCloudUrl = zmconfig.hwCloudUrl;
	    this.hwCloudUrl = zmconfig.hwCloudUrl;
	    const b = 2; // const b = 2;
	  },

	  destroyed: function() {
	    const a = 1;
	  },
	  methods: {
	    // 扫码结果返回
	    scanCode(event) {
	      this.$emit('scancode', event);
	      const source = this.$createMediaAudioPlayer();
	      this.$showToast({
	        title: 'title',
	        icon: 'none'
	      });
	    },

	    // 闪光灯开关
	    flashTap() {
	      const cameraFlash = !this.cameraFlash;
	      this.cameraFlash = cameraFlash;
	    }

	  }
	};
</script>
<style lang="scss" scoped>
	@import '../common/index.css';
	@import '../common/iconfont.css';

	.zm-scanning {
	    height: var(--camera-height);
	    width: var(--camera-width);
	    position: relative;
	}

	.zm-scanning .camera-bg {
	    position: absolute;
	    z-index: 1;
	    height: 100%;
	    width: 100%;
	}

	@keyframes scanScroll {
	    from {
	        top: 0
	    }

	    to {
	        top: calc(var(--camera-height) - var(--scan-scroll-height))
	    }
	}

	.zm-scanning .scan-scroll {
	    position: absolute;
	    z-index: 1;
	    top: 0;
	    left: 0;
	    height: 25px;
	    width: 100%;
	    animation: scanScroll 3s infinite;
	    animation-timing-function: linear;
	}

	.zm-scanning .lighter-wrapper {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    position: absolute;
	    z-index: 1;
	    bottom: 14px;
	    left: 50%;
	    transform: translateX(-50%);
	}

	.zm-scanning .lighter-wrapper .camera-lighter {
	    font-size: 34px;
	    color: rgba(255, 255, 255, 0.7);
	}

	.zm-scanning .camera-area {
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	}
</style>