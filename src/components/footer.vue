<template>
	<div>
		<footer class="footer" v-if="navActive==0">
			<div class="footer_center">
				<span class="web-font icon-smile" @click="showLook"></span>
				<input v-model="val" type="text" id="text_val" required placeholder="请在此输入消息">
				<button id="mes_btn" @click=send></button>
			</div>

			<!--未登录-->
			<div class="login_nocontent" v-show="isLogin==2 && visitMode==0" @click="show"></div>
		</footer>

		<!-- 表情 -->
		<div class="dia_content" v-show="lookview" @click="closelook"></div>
		<div class="look_content" v-show="lookview" id="look">
			<ul>
				<li>
					<img @click="addLook(0)" src="../assets/smile.gif" alt="">
				</li>
				<li>
					<img @click="addLook(1)" src="../assets/biggrin.gif" alt="">
				</li>
				<li>
					<img @click="addLook(2)" src="../assets/lol.gif" alt="">
				</li>
				<li>
					<img @click="addLook(3)" src="../assets/titter.gif" alt="">
				</li>
				<li>
					<img @click="addLook(4)" src="../assets/db.gif" alt="">
				</li>
				<li>
					<img @click="addLook(5)" src="../assets/se.gif" alt="">
				</li>
				<li>
					<img @click="addLook(6)" src="../assets/jk.gif" alt="">
				</li>
				<li>
					<img @click="addLook(7)" src="../assets/yiw.gif" alt="">
				</li>
				<li>
					<img @click="addLook(8)" src="../assets/yun.gif" alt="">
				</li>
				<li>
					<img @click="addLook(9)" src="../assets/shocked.gif" alt="">
				</li>
				<li>
					<img @click="addLook(10)" src="../assets/zj.gif" alt="">
				</li>
				<li>
					<img @click="addLook(11)" src="../assets/mg.gif" alt="">
				</li>
				<li>
					<img @click="addLook(12)" src="../assets/bq.gif" alt="">
				</li>
				<li>
					<img @click="addLook(13)" src="../assets/handshake.gif" alt="">
				</li>
				<li>
					<img @click="addLook(14)" src="../assets/hd.gif" alt="">
				</li>
				<li>
					<img @click="addLook(15)" src="../assets/qiang.gif" alt="">
				</li>
				<li>
					<img @click="addLook(16)" src="../assets/victory.gif" alt="">
				</li>
				<li>
					<img @click="addLook(17)" src="../assets/kf.gif" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';

	import {getString,look,noLogin,lookimg} from '../js/common'
export default {
	data () {
		return {
			val:'',
			lookview:false,
			loginurl:'http://expo.ofweek.com/mobile/login.xhtml?callback='+location.href
		}
	},
	computed:{
		isPrivateChat(){
			return this.$store.state.isPrivateChat;
		},
		chatObj(){
			return this.$store.state.chatObj;
		},
		kfList(){
			return this.$store.state.kfList;
		}
	},
	methods:{
		send:function(){
			if(this.val == ''){
				return
			}
			
			
			let url="";
			//私聊发送
			
			

			if(this.isPrivateChat){
				this.chatObj.id = this.chatObj.id == undefined ? this.kfList[0].id : this.chatObj.id

				if(this.isLogin==1){ //非游客
				
				   url = getString('0003',{content:this.val,receiverId:this.chatObj.id,boothId:userLogin.boothId})
					webSocket.send(url)

					
				}else{ //游客

					url = getString('0005',{content:this.val,receiverId:this.chatObj.id,boothId:userLogin.boothId})
					webSocket.send(url)

				}

				let mesobj={};
	                mesobj.author={};
	                mesobj.author.userType=1;
	                mesobj.chatTime=new Date().getTime();
	                mesobj.content=lookimg(this.val);
	                this.$store.dispatch('addPrivateMes',mesobj);
	                $(".chat-con").scrollTop(200000)


			}else{ //群聊发送

				url = getString('0007',{content:this.val})
				webSocket.send(url)
			}

			

			this.val = ''
		},
		show:function(){
			//未登录弹窗
			noLogin()
		},
		closelook:function(){
			this.lookview = false
		},
		showLook:function(){
			this.lookview = true
		},
		addLook:function(index){
			this.val += '[' + look[index] + ']'
			this.lookview = false
		}
	},
	props:{
		isLogin:{
			type:Number
		},
		navActive:{
			type:Number
		},
		visitMode:{
            type:Number
        }
	}
}
</script>

<style>

</style>
