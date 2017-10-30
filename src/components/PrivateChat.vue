<template>
    <section class="content5">
    <div ref="container" class="chat-con">
        <div class="slideMore">下拉刷新</div>
        <div class="chat-list clearfix">
            <!-- <p class="chat-time">2017-10-10 9:00</p> -->
            <div class="clearfix"  v-for="mess in privateMessage">
                <div  :class="mess.author.userType==1 || mess.author.userType==5 ?'myself-say':'other-say'"  v-html="mess.content"></div>    
            </div>
        </div>
    </div>
    </section>
</template>

<script>
//https://github.com/PeachScript/vue-infinite-loading
//https://peachscript.github.io/vue-infinite-loading/#!/installation
import {lookimg, biaoQing,getString} from '../js/common'
export default{
     props:{
        isLogin:{
            type:Number
        },
        navActive:{
            type:Number
        }
    },
        computed:{
            privateMessage(){
                return this.$store.state.privateMessage
            },
            chatObj(){
                return this.$store.state.chatObj
            },
            startNum(){
                return this.$store.state.startNum
            },
            noChatMsg(){
                return this.$store.state.noChatMsg
            },
            kfList(){
              return this.$store.state.kfList
            }
        },
        data(){
            return{
                msg: '',
                flag: 0, // 表示是否达到刷新条件
                loading: 0,  // 表示是否正在刷新中
                touchStart: 0,  // 手指触摸屏幕的起点
                distance: 0     // 手指滑动的距离
            }
        },
        methods:{
            
        },
        mounted(){

        let $this = this

        var slidemore=document.querySelector(".slideMore");
        const container = this.$refs.container
        container.addEventListener('touchstart', (e) => {
        // 如果loading为true就代表刷新函数正在进行，此时阻止下拉操作，返回
        if (this.loading) { 
          e.preventDefault()
          return
        }
        // 取第一个手指的触摸点作为起始点
        this.touchStart = e.targetTouches[0].clientY
      })
      container.addEventListener('touchmove', (e) => {
        // 如果没有触摸起始点，返回
        if (!this.touchStart) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          return
        }

        const touch = e.targetTouches[0]
        const scrollTop = container.scrollTop
        if (scrollTop === 0) {
          this.distance = touch.clientY - this.touchStart
          if (this.distance > 0) {
            e.preventDefault()
            if (this.distance < 50) {
              container.style.overflow = 'inherit'
              container.style.transform = 'translate3D(0px, ' + this.distance +'px, 0px)'
              if (this.distance > 25) {
                  slidemore.innerHTML="释放刷新"
                  this.flag = 1
              } else {
                  slidemore.innerHTML="下拉刷新"

              }
            }
          }
        }
      })
      container.addEventListener('touchend', (e) => {
        
        if($this.noChatMsg && container.scrollTop == 0){
            slidemore.innerHTML="没有更多了"
            setTimeout(()=>{
                this.flag = 0
                this.loading = 0
                container.scrollTop = 0
                container.style.overflow = 'auto'
                container.style.transform = 'translate3D(0px, 0px, 0px)'
            },100)
            return;
        }
        if (this.distance === 0) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          return
        }
        
        if (this.flag && this.distance > 0) {
          // container.style.transform = 'translate3D(0px, 20px, 0px)'
          this.loading = 1
          
        slidemore.style.display='block'
        slidemore.innerHTML="正在加载"
        setTimeout(()=>{
            $this.chatObj.id = $this.chatObj.id == undefined ? $this.kfList[0].id : $this.chatObj.id

            let pHistoryurl="";

            if($this.isLogin==1){
                pHistoryurl = getString('0075',{"receiverId":$this.chatObj.id,"start":$this.startNum,"size":20})    
            }else{
                pHistoryurl = getString('0077',{"receiverId":$this.chatObj.id,"start":$this.startNum,"size":20})    
            }

            
            webSocket.send(pHistoryurl)

            $this.$store.commit('getStartNum',$this.startNum+20);

            this.flag = 0
            this.loading = 0
            container.scrollTop = 0
            container.style.overflow = 'auto'
            container.style.transform = 'translate3D(0px, 0px, 0px)'
        },100);
            return
        }
        // 重置变量
        this.flag = 0
        container.style.overflow = 'auto'
        container.style.transform = 'translate3D(0px, 0px, 0px)'
      })




        }
    
       
    }
    
</script>
<style>
    .content5{padding: 1.7rem 0 1.2rem;height: 100%;width: 100%;background: #fff;}

    .chat-con{
        padding: 0 .4rem 0;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
    }
    .chat-time{
        font-size:.24rem;
        line-height: .4rem;
        color:#a5a5a5;
    }
    .chat-list img{
        width:.56rem;
        height:.56rem;
    }
    .other-say,.myself-say{
        /*width:5.24rem;*/
        min-height: .66rem;
        font-size: .28rem;
        line-height: .32rem;
        color:#333; 
        word-break: break-all;
        padding:.16rem .2rem .1rem .24rem;
        margin-bottom: .2rem;
        border-radius: .08rem;
        position: relative;
    }
    .other-say{
        background:#f6f6f6;
        float: left;
        
    }
    .other-say:before,.myself-say:after{
        content: "";
        position: absolute;
        width:0;
        height: 0;
        font-size: 0;
        border-width:.1rem;
        transform:translateY(-50%);
        -webkit-transform:translateY(-50%);
                
    }
    .other-say:before{
        border-style:dashed solid dashed dashed;
        border-color:transparent #f6f6f6 transparent transparent;
        left:-.18rem;
        top:50%;

    }
    .myself-say:after{
        border-style:dashed dashed dashed solid;
        border-color:transparent transparent transparent #0084FF; 
        right:-.18rem;
        top:50%;
    }
    .myself-say{
        background: #0084FF;
        color:#fff;
        float: right;
    }

    .slideMore{text-align: center;color: #666;line-height: .6rem;margin-top:-.6rem;}

/*     .chat-con{position: absolute;
width: 100%;
left: 0;
} */

</style>