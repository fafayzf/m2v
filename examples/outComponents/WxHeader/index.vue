<template>
	<div>
	  <div :class="['test',a ? 'a' : 'b']" v-for="(user,index) in list" :key="index" :id="`item-${item.a} item-${item.b}`" v-if="user.a" v-show="isShow" :data-tpye="item.id" :data="a" @click="handleDetail">
	    <div v-if="test">view</div>
	    <div>
	      <div :class="['test',a ? 'a' : 'b']" v-for="(user,index) in list" :key="index" :id="`item-${item.a} item-${item.b}`" v-if="user.a" v-show="isShow" :data-tpye="item.id" :data="a" @click="handleDetail">123</div>
	      h2
	      <div>text</div>
	      <img src="http://www.baidu.com">



	    </div>
	    <template>
	      <div>123</div>
	      <div>456</div>
	    </template>
	  </div>
	  <div class="hello" hover-class="none" hover-stop-propagation="false" @click="onClick">
	    hello
	  </div>
	</div>
</template>
<script>
	export default {
	  mixins: [mixins],
	  props: {
	    myProperty: {
	      // 属性名
	      type: String,
	      default: ''
	    },
	    myProperty2: {
	      type: Array,
	      default: () => []
	    } // 简化的定义方式

	  },
	  data: {
	    test: 1,
	    lifetimes: {}
	  },
	  // 私有数据，可用于模板渲染
	  lifetimes: {
	    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
	    attached: function() {},
	    moved: function() {},
	    detached: function() {}
	  },
	  // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
	  attached: function() {},
	  // 此处 attached 的声明会被 lifetimes 字段中的声明覆盖
	  ready: function() {
	    console.log('ready');
	  },
	  pageLifetimes: {
	    // 组件所在页面的生命周期函数
	    show: function() {},
	    hide: function() {},
	    resize: function() {}
	  },
	  methods: {
	    // attached: 
	    onMyButtonTap: function() {
	      this.setData({ // 更新属性和数据的方法与更新页面数据的方法类似
	      });
	    },
	    // 内部方法建议以下划线开头
	    _myPrivateMethod: function() {
	      // 这里将 data.A[0].B 设为 'myPrivateData'
	      this.setData({
	        test: 2
	      });
	      wx.showToast({
	        title: 'title'
	      });
	    },
	    _propertyChange: function(newVal, oldVal) {}
	  }
	};
</script>
<style lang="scss" scoped>
	.header {
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 750rpx;
	    height: 100rpx;
	}
</style>