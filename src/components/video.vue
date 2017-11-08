<template>
	<div class="area_video">

		<div class="play-view" v-if="model==0 || model==2 || model==3" v-show="!isPlaying" v-on:click="clickPlay()" v-bind:style="styleObject">
			<img class="play-icon" src="../assets/play.png">
		</div>
		<!--轮播-->
		<div class="video_content" v-if="model==3">
			<video id="lbVideo" v-bind:poster="vodList[index].bgUrl" v-bind:src="vodList[index].mp4Url" v-show="isPlaying" webkit-playsinline playsinline controls onended="change(this)" v-on:playing="playing"></video>
		</div>

		<!-- 直播 -->
		<div class="video_container"  v-if="model==0">
			<video id="liveVideo" v-bind:src="hlsDownstream" v-show="isPlaying" v-on:playing="playing" webkit-playsinline playsinline autoplay controls></video>
		</div>

		<!-- ppt直播 -->
		<div class="swiper-containerPic"  v-if="model==1">
<!--			<p>如果您听不到直播声音，建议用电脑观看PPT直播</p>-->
			<audio id="ppTVideo" v-bind:src="hlsDownstream" controls autoplay></audio>
			<img v-bind:src="pptImg" alt=""/>
		</div>

		<!--直播录播-->
		<div class="vod_content" v-if="model==2">
			<video id="recordVideo" v-bind:src="vodName" v-show="isPlaying" v-on:playing="playing" webkit-playsinline playsinline autoplay controls></video>
		</div>

		<!-- 图集轮播-->
		<div class="swiper-containerPic" v-if="model==4">
			<img v-bind:src="picArr[picIndex].url" alt=""/>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			index:0,
			picIndex:0,
			isPlaying:false
		}
	},
	computed:{
		styleObject(){
			if(this.vodList.length){
				return{
					background: 'url('+this.vodList[0].bgUrl+') center center no-repeat',
					backgroundSize:'cover'	
				}	
			}
			return "";
			
		
		}
	},
	props:{
		vodList:{
			type:Array
		},
		model:{
			type:Number
		},
		picArr:{
			type:Array
		},
		vodName:{
			type:String
		},
		hlsDownstream:{
			type:String
		},
		pptImg:{
			type:String
		}
	},
	methods:{
		changes:function(){
			alert(this.index)
			this.index++
		},
		clickPlay: function(){
			document.querySelectorAll('video')[0].play()
		},
		playing: function(){
			this.isPlaying = true
		}
	},
	
	mounted:function(){
		let _this = this
		setInterval(function(){
			if(_this.picIndex == _this.picArr.length-1){
				_this.picIndex = 0
			}
			_this.picIndex++
		},4000)
	}
}
</script>

<style scoped>
	audio{position: absolute;z-index: 5;left: 0;bottom: 0;width: 100%;background: #000;}
	.video_content,.video_container{background: #000}
video{
	width: 100%;
	height: 4.05rem;}
.swiper-containerPic{position: relative}
.swiper-containerPic p{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: .6rem;
    line-height: .6rem;background: rgba(0,0,0,.3);padding-left: .3rem;color: #FFFF00;text-align: left}
    .play-view{ position: relative; width: 100%; height: 100%; }
.play-icon{ position: absolute; left: 50%; top: 50%; width: 50px; height: 50px; margin: -25px 0 0 -25px; }

</style>
