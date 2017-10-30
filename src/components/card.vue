<template>
	<div>
		<div class="card" v-if="card_show && iscard!=1 && isLogin == 1">
			<div class="crad_pop" @click="cardHide"></div>
			
			<div class="card_content">
			    <div class="closeCard" @click="cardHide"></div>
				<img src="../assets/change.png" alt=""/>
				<p>欢迎光临，交换下名片吧！</p>
				<span class="agree_card" @click="card_sub">同意交换</span>
				<span class="card_no" @click="cardHide">不，先逛逛</span>
			</div>
		</div>
		<!--未登录弹窗-->
		<!-- <div class="pop" v-show="showlogin"></div>
		<div class="login_warm diaglog" v-show="showlogin">
			<span class="closeBtn"></span>
			<div class="login_icon"></div>
			<p>请先登录!</p>
			<a v-bind:href="loginurl">马上登录</a>
			<a class="resgLink" href="http://www.ofweek.com/3g/registerUser3g.do">立即注册</a>
		</div> -->
	</div>
</template>

<script>
	import {getString,noLogin} from '../js/common'
	export default {
		data () {
			return {
				card_show:true,
				showlogin:false,
				loginurl:'http://expo.ofweek.com/mobile/login.xhtml?callback='+location.href
			}
		},
		props:{
			iscard:{
				type:Number
			},
			isLogin:{
				type:Number
			}
		},
		methods:{
			cardHide:function(){
				this.card_show = false
			},
			card_sub:function(){
				//未登录
				if(this.iscard == 0){
					noLogin();
					this.card_show = false
					
					//已登录已交换
				}else if(this.iscard == 1){
					//已登录未交换
				}else if(this.iscard == 2){
					let url = getString('0066',{"waiterId":"","targetType":1})
					console.log(url)
					webSocket.send(url)
					this.card_show = false
				}
			},
			closeDia:function(){
				this.showlogin = false
			}
		}
	}
</script>

<style>
.card{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 50;
}
.crad_pop{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
}
.card_content{
	position: absolute;
	background: #fff;
	padding: .5rem 0;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 51;
	text-align: center;
}
	.card_content img{
		width: 1.3rem;}
	.card_content span{
		display: inline-block;
		width: 2.3rem;
		height: .72rem;
		line-height: .72rem;
		border-radius: .08rem;
		font-size: .36rem;
	}
	.agree_card{
		background: #cc0000;
		color: #fff;
	}
	.card_no{
		color: #3a3a3a;
		border: 1px solid #3a3a3a;
		margin-left: .6rem;
	}
	.card_content p{color: #000000;font-size: .28rem;margin: .3rem 0 .5rem;}
    
    .closeCard{position: absolute;display: block;width: .48rem;height: .48rem;background: url(../assets/close.png);background-size: 100% 100%;right: .2rem;top: .2rem};
</style>