<template>
	<div>
	  <demo-block title="顶部导航栏" padding>
	    <zm-nav-bar>顶部导航栏</zm-nav-bar>
	  </demo-block>
	</div>
</template>
<script>
	import ZmNavBar from "../../nav-bar/index.vue";
	export default {
	  components: {
	    "zm-nav-bar": ZmNavBar
	  },

	  data() {
	    return {};
	  }

	};
</script>
<style lang="scss" scoped>
	.row {
	    height: 44px;
	    margin-bottom: 15px;
	}

	.demo-margin-left {
	    margin-left: 10px;
	}

	.demo-margin-right {
	    margin-right: 10px;
	}

	.demo-margin-bottom {
	    display: block;
	    margin-bottom: 15px;
	}
</style>