<template>
		<section class="content2"  v-show="navActive == 1">
			<h2 v-show="productlist.length>0">推荐展品</h2>
			<ul>
				<li class="clearfix" v-for="item in productlist">
					<a class="fl" @click="showDetail(item.id)">
						<img v-bind:src=item.url>
					</a>
					<div class="fr content2_main">
						<h3 @click="showDetail(item.id)"><a>{{item.name}}</a></h3>
						<span class="fr ly" @click="mesBtn(item.id)">留言咨询</span>
						<span class="fr sq" @click="send(item.id)">申请样品</span>
					</div>
				</li>
			</ul>
			<div v-for="i in productarr"  class="items_product">
				<h2>{{i[0].groupName}}</h2>
				<ul>
					<li class="clearfix" v-for="m in i">
						<a class="fl" @click="showDetail(m.id)">
							<img v-bind:src=m.url>
						</a>
						<div class="fr content2_main">
							<h3 @click="showDetail(m.id)"><a>{{m.name}}</a></h3>
							<span class="fr ly" @click="mesBtn(m.id)">留言咨询</span>
							<span class="fr sq" @click="send(m.id)">申请样品</span>
						</div>
					</li>
				</ul>
			</div>

			<div class="pop" v-show="isShow==1 || isShow == 2" @click="hide"></div>
			<!-- 样品申请 -->
			<div class="diaglog module_pop" v-show="isShow==1" id="module_sq">
				<span class="web-font icon-close" @click="hide"></span>
				<h4>样品申请</h4>
				<article>
					<p>请简述您的申请样品的用途:</p>
					<textarea  v-model="val1"></textarea>
					<span class="fl redColor">提交内容不能为空</span><button class="fr" @click="sendSub">提交</button>
				</article>
			</div>
			<!-- 留言 -->
			<div class="diaglog module_pop" v-show="isShow == 2" id="module_ly">
				<span class="web-font icon-close" @click="hide"></span>
				<h4>留言</h4>
				<article>
					<!-- 			<p>主题:</p>
                                <input id="tlt_area" type="text"> -->
					<p>内容:</p>
					<textarea  v-model="val2"></textarea>
					<span class="fl redColor">提交内容不能为空</span>
					<button class="fr" @click="mesSub">提交</button>
				</article>
			</div>

			<!--产品详情-->
			<div class="details_content" v-if="lookShow" @click="lookhide">
				<div class="details_main">
					<div class="swiper-container-details">
						<div class="swiper-container">
							<!--<div class="swiper-wrapper">-->
								<div class="swiper-slide" v-for="i in urlList">
									<a><img v-bind:src="i" alt=""/></a>
								</div>
							<!--</div>-->
						</div>

						<div class="details_title">
							<a class="fl">{{name}}</a>
						</div>
						<div class="details_can">
							<p v-html="remark"></p>
						</div>

						<div class="footer_items clearfix">
							<a class="fl" @click="send(id)">申请样品</a>
							<a class="fr" @click="mesBtn(id)">留言咨询</a>
						</div>
					</div>
				</div>
			</div>
		</section>
</template>

<script>
//	import Swiper from 'swiper'
import {getString,noLogin} from '../js/common'
export default {
	data (){
		return {
			isShow:0,
			val1:'',
			val2:'',
			id:'',
			lookShow:false,
			remark:'暂无内容', //备注
			name:'', //产品名称
			urlList:new Array(),
			loginurl:'http://expo.ofweek.com/mobile/login.xhtml?callback='+location.href
		}
	},
	props:{
		productarr: {
			type: Array
		},
		productlist: {
			type: Array
		},
		navActive: {
			type: Number
		},
		isLogin: {
			type: Number
		},
		visitMode: {
            type: Number
        },
		user: {
            type: Object
        }

	},
	methods:{

		//留言
		mesBtn:function(id){
			//游客模式和会员模式都要登录和完善名片
			if(this.isLogin == 1 && !this.user.cardCompleted){
				window.location.href = 'http://www.ofweek.com/user/toWanShanLivePage.do?regType=15&returnurl='+location.href+'&userid='+this.user.account

			}else if(this.isLogin == 1 &&　this.user.cardCompleted)
				this.isShow = 2
			else{
				//登录弹窗
				noLogin()
			}
		},
		//样品申请
		send:function(id){
			//游客模式和会员模式都要登录和完善名片
			if(this.isLogin == 1 && !this.user.cardCompleted){
				window.location.href = 'http://www.ofweek.com/user/toWanShanLivePage.do?regType=15&returnurl='+location.href+'&userid='+this.user.account

			}else if(this.isLogin == 1 &&　this.user.cardCompleted){
				this.isShow = 1
				this.id = id
			}else{
				//登录弹窗
				noLogin()
			}
		},
		//隐藏弹窗
		hide:function(){
			this.isShow = 0
		},
		//提交样品申请
		sendSub:function(){
			if(this.val1 == ''){
				alert('请输入申请样品用途!')
				return
			}

			let url = getString('0047',{"applicantId":userLogin.userId,"purpose":this.val1,"productIdList":this.id})
			webSocket.send(url)
			this.val1= ''
			this.isShow = 0
		},
		//提交留言
		mesSub:function(){
			if(this.val2 == ''){
				alert('请输入留言内容!')
				return
			}

			let url = getString('0011',{"content":this.val2,"receiverId":userLogin.userId,"subject":'',"boothId":userLogin.boothId})
			webSocket.send(url)
			this.val2= ''
			this.isShow = 0
		},
		//查看详情
		showDetail:function(id){
			this.id = id
			if(this.isLogin == 2 && this.visitMode == 0){
				noLogin()
				return
			}
			this.lookShow = true
			for (let i = 0; i < this.productarr.length;i++){
				var a = this.productarr[i]
				for (let j = 0;j < a.length; j++){
					if(id == a[j].id){
						var remark = a[j].remark.replace(/&gt;/g,'>');
						remark = remark.replace(/&lt;/g,'<');
						this.remark = remark
						this.name = a[j].name
						this.urlList = a[j].urlList
					}
				}
			}
		},
		//关闭查看详情
		lookhide:function(){
			this.lookShow = false
		}
	}
}
</script>
<style scoped>
.swiper-container {
	width: 100%;
	height: 100%;
}
	.swiper-container-details .swiper-slide{margin-bottom: .12rem;}
.swiper-container-details .swiper-slide:last-child{margin-bottom: 0}
</style>
