<template>
	<section class="content3"  v-show="navActive == 2">
		<ul v-if="loadarr.length>0">
			<li v-for="i in loadarr">
				<a v-bind:href="i.url" @click="load">
					<p>{{i.dataName}}</p>
					<span class="web-font icon-download fr"></span>
				</a>
			</li>
		</ul>
		<p class="no_load" v-if="loadarr.length==0">暂无下载资料</p>
	</section>
</template>

<script>
	import {getString,noLogin} from '../js/common'
export default {
	props:{
		loadarr:{
			type:Array
		},
		navActive:{
			type:Number
		}
	},
	methods:{
		load:function(){
			if(userLogin.loginType == 2){
				noLogin()
				event.preventDefault()		
				return
			}
			let url = getString('0068')
			webSocket.send(url)
		}
	}
}
</script>

<style scoped>
.no_load{text-align: center;line-height: 1.2rem;color:#999999;}
</style>
