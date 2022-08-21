<template>
	<div>
	  <demo-block title="扫码" padding>
	    <zm-scanning>扫码</zm-scanning>
	  </demo-block>
	</div>
</template>
<script>
	import ZmScanning from "../../scanning/index.vue";
	export default {
	  components: {
	    "zm-scanning": ZmScanning
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