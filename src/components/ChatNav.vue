<template>
    <div class="chat-nav">
        <nav>
            <ul>
                <li :class="{active:currChatIndex==-1}" @click="switchChat(-1)">
                    <h4><img src="../assets/chat.png" alt=""></h4>
                    <p>群聊</p>
                </li>
                <!--私聊 客服-->
                <li v-for="(kf,index) in kfList"  :class="{active:currChatIndex==index}" :id="kf.id" @click="switchChat(index)">
                    <h4>
                        <img v-if="kf.url" :src="kf.url" alt="">
                        <img v-if="!kf.url" src="../assets/kefu.png" alt="">
                        <span v-show="kf.num">{{kf.num}}</span>
                    </h4>
                    <p>{{kf.name}}</p>
                </li>

            </ul>
        </nav>
    </div>
</template>
<script>
import {getString,noLogin} from '../js/common'

    export default {
        props:{
            visitMode:{
                type:Number
            },
            isLogin:{
                type:Number
            }
        },
        computed:{
            kfList(){
              return this.$store.state.kfList
            },
            currChatIndex(){
                return this.$store.state.currChatIndex
            },
            startNum(){
                return this.$store.state.startNum
            }
        },
        methods:{
            switchChat(id){
                // this.currChatIndex=id
                this.$store.dispatch('currChatIndex',id);

                if(id==-1){  //公聊
                    if(this.visitMode == 1 && this.isLogin ==2 ){
                        noLogin();
                        return;
                    }
                    this.$store.dispatch('isPrivateChat',false);
                    
                }else{ //私聊

                    this.kfList[id].num=0;
                    this.$store.dispatch('isPrivateChat',true);
                    this.$store.dispatch('chatObj',this.kfList[id]);
                    //在请求历史消息前先清空privateMessage
                    this.$store.commit('clearPrivateMes');

                    let pHistoryurl="";

                    if(this.isLogin==1){ //会员
                        pHistoryurl = getString('0075',{"receiverId":this.kfList[id].id,"start":this.startNum,"size":20})    
                    }else{ //游客
                        pHistoryurl = getString('0077',{"receiverId":this.kfList[id].id,"start":this.startNum,"size":20})    
                    }
                    //加载聊天记录，每页20条
                    
                    webSocket.send(pHistoryurl)
                    this.$store.commit('getStartNum',this.startNum+20);

                }  
                  
                

            }
                
      },
    mounted(){
        $(".chat-nav li").eq(0).addClass("active");
    }


    }
</script>
<style scoped>
    .chat-nav{
        position: absolute;
        left:0;
        width:100%;
        top:5.95rem;
        z-index: 3;
        height: 1.3rem;
        overflow: hidden;
        border-bottom: 1px solid #e9e9e9;
    }
    .chat-nav nav{
        height: 1.5rem;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
        
    }

    .chat-nav ul{
        font-size: 0;
        white-space: nowrap;
    }
    .chat-nav li{
        min-width:1.96rem;
        height:1.3rem;
        display:inline-block;
        text-align: center;
        border-right: 1px solid #e9e9e9;
        padding-top:.12rem;
    }
    .chat-nav li.active{background: #EFEFEF;}
    .chat-nav li h4{
        width:.64rem;
        height: .64rem;
        margin:0 auto;
        position: relative;
    }
    .chat-nav li img{
        width:.64rem;
        height: .64rem;
        border-radius: 50%;
    }
    .chat-nav li h4 span{
        position: absolute;
        width:.34rem;
        height: .34rem;
        line-height: .34rem;
        font-size: .22rem;
        font-weight: normal;
        color:#fff;
        border-radius: 50%;
        background: #E65E50;
        right:-.21rem;
        top:-.04rem;
    }

    .chat-nav li p{
        font-size: .24rem;
        line-height: .34rem;
        margin-top: .08rem;
        text-align: center;
    }
    .chat-nav li.active{
        background: #EFEFEF;
    }
</style>
