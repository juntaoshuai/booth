<template>
	<header class="header">
		<a class="fl web-font icon-fanhui" v-bind:href="exhibition.expoUrl"></a>
		<h3 class="fl">{{companyName}}</h3>
		<!-- <a href="#" class="fr web-font icon-share"></a> -->
		<a href="javascript:;" class="fr web-font icon-user" v-show="isLogin==2" @click="showLogin"></a>
		<!-- <a href="javascript:;" class="user_icon fr"><img src="images/user_icon.jpg" alt=""></a> -->
	</header>
</template>

<script>
import {noLogin} from '../js/common'

export default {
	data () {
		return {
			backurl: function() {
				return 'http://expo.ofweek.com/exhibition/index.xhtml?expo='+this.exhibition.id;
			}
		}
	},
	props:{
		companyName:{
			type:String
		},
		isLogin:{
			type:Number
		},
		exhibition:{
			type:Object
		}
	},
	methods: {
		showLogin(){
			noLogin()
		}
	}
}
</script>

<style scoped>

</style>
