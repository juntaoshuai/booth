<template>
	<section class="content1" >
		<article>
			<aside>
				<span>公告</span>
				<div class="marqueeText" id="marqueeText">
					<span class="marquee" id="marquee" v-html="bulletin"> </span>
				</div>
			</aside>
			<div class="items">
				<ul id="mes">
					<li v-for="i in message">
						<!--<img src="../assets/logo.png">-->
						<span v-if="i.author.name != ''">{{i.author.name}}:</span>
						<a v-html="i.content"></a>
					</li>
				</ul>
			</div>
		</article>	
	</section>
</template>

<script>
	import {scrollLeft} from '../js/common'
export default {
	data (){
		return {
			index:0,
			tol:0
		}
	},
	props:{
		message:{
			type:Array
		},
		bulletin:{
			type:String
		},
		navActive:{
			type:Number
		}
	},
	mounted:function(){
		let area = document.getElementById("mes")
		area.scrollTop = area.scrollHeight
	},
	updated:function(){
		let area = document.getElementById("mes")
		area.scrollTop = area.scrollHeight
		if(this.index == 0){
			this.index = 1
			var val = document.getElementById("marquee").innerHTML
			if(val != ''){
				scrollLeft('marqueeText', 'marquee', 30)
			}
		}
	}
}
</script>

<style scoped>
#marqueeText{min-width: 1rem}
</style>
