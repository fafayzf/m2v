<template>
	<div>
	  <div :class="['test',a ? 'a' : 'b']" v-for="(user,index) in list" :key="index" :id="`item-${item.a} item-${item.b}`" v-if="user.a" v-show="isShow" :data-tpye="item.id" :data="a" @click="handleDetail">
	    <div v-if="test">view</div>
	    <div>
	      <div :class="['test',a ? 'a' : 'b']" v-for="(user,index) in list" :key="index" :id="`item-${item.a} item-${item.b}`" v-if="user.a" v-show="isShow" :data-tpye="item.id" :data="a" @click="handleDetail">
	        <div :class="['test',a ? 'a' : 'b']" v-for="(user,index) in list" :key="index" :id="`item-${item.a} item-${item.b}`" v-if="user.a" v-show="isShow" :data-tpye="item.id" :data="a" @click="handleDetail">
	          456
	        </div>
	      </div>
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
	import NavTab from "../components/nav";
	export default {
	  components: {
	    "nav-tab": NavTab
	  },
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

	  data() {
	    return {
	      test: 1,
	      lifetimes: {}
	    };
	  },

	  // 私有数据，可用于模板渲染
	  destroyed: function() {},
	  mounted: function() {
	    console.log('ready');
	  },
	  methods: {
	    // attached: 
	    onMyButtonTap: function() {
	      this.test = 2;
	      this.test = 2;
	      this.test = 2;
	    },
	    // 内部方法建议以下划线开头
	    _myPrivateMethod: function() {
	      const {
	        test
	      } = this;
	      const user = this.user; // 这里将 data.A[0].B 设为 'myPrivateData'

	      this.test = 2;
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
	    width: 375px;
	    height: 50px;
	}

	.content {
	    width: 50px;
	}
</style>