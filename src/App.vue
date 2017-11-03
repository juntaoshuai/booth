<template>
    <div id="app">
        <headerload></headerload>
        <!-- 头部 -->
        <my-header :company-name="companyName" :exhibition="exhibition" :isLogin="isLogin"></my-header>
        <!-- 视频区域 -->
        <nav class="nav">
            <!-- 上一站台 -->
            <a v-bind:href="downLink" class="next_booth">&gt;</a>
            <!-- 下一站台 -->
            <a v-bind:href="upLink" class="up_booth">&lt;</a>
            <!-- 视频区域 -->
            <my-video :vodList="vodList" :model="model" :picArr="picArr" :vodName="vodName" :pptImg="pptImg" :hlsDownstream="hlsDownstream"></my-video>
            <div class="gray"></div>
            <!-- 导航条 -->
            <div class="nav-list">
                <ul>
                    <li><a v-bind:class="navActive == 0? 'active':''"  @click="navChange(0)">互动区</a></li>
                    <li><a v-bind:class="navActive == 1? 'active':''" @click="navChange(1)">展品</a></li>
                    <li><a v-bind:class="navActive == 2? 'active':''" @click="navChange(2)">资料下载</a></li>
                    <li><a v-bind:class="navActive == 3? 'active':''" @click="navChange(3)">公司信息</a></li>
                </ul>
            </div>
        </nav>

        <chat-nav :visitMode="visitMode" :isLogin="isLogin" v-show="navActive == 0"></chat-nav>

        <!-- 内容区域 -->
        <div class="container">
            <!-- 互动区群聊-->
            <my-content1 :message="message" :nav-active="navActive" :bulletin="bulletin" v-show="!isPrivateChat && navActive == 0"></my-content1>
            <!--私聊-->
            <private-chat :isLogin="isLogin"  v-show="isPrivateChat && navActive == 0"></private-chat>
            <!-- 展品 -->
            <my-content2 :visitMode="visitMode" :productarr=productarr :nav-active="navActive" :isLogin="isLogin" :productlist=productlist></my-content2>
            <!-- 资料下载 -->
            <my-content3 :loadarr=loadarr :nav-active="navActive"></my-content3>
            <!-- 公司信息 -->
            <my-content4 :company=company :nav-active="navActive"></my-content4>
        </div>

        <!-- 聊天区域 -->
        <my-footer :isLogin="isLogin" :nav-active="navActive" :visitMode="visitMode"></my-footer>
        <!--初始化加载-->
        <loading :model="model"></loading>

        <!--名片交换-->
        <card :iscard="iscard" :isLogin="isLogin"></card>
		<!--未登录弹窗-->
		<login :visitMode="visitMode" :exhibition="exhibition"></login>
    </div>
</template>

<script>
import headerload from "./components/headerload";
import myHeader from "./components/header";
import myVideo from "./components/video";
import myFooter from "./components/footer";
import myContent1 from "./components/content1";
import myContent2 from "./components/content2";
import myContent3 from "./components/content3";
import myContent4 from "./components/content4";
import loading from "./components/load";
import card from "./components/card";
import login from "./components/login";
import ChatNav from "./components/ChatNav";
import PrivateChat from "./components/PrivateChat";

import { socket, port, socketUrl } from "./js/socket";
import { lookimg, getString, scrollLeft, sortArr, noLogin } from "./js/common";
import send from "./js/send";

export default {
  components: {
    headerload,
    myHeader,
    myVideo,
    myFooter,
    myContent1,
    myContent2,
    myContent3,
    myContent4,
    loading,
    card,
    login,
    ChatNav,
    PrivateChat
  },
  computed: {
    isPrivateChat() {
      return this.$store.state.isPrivateChat;
    },
    currChatIndex() {
      return this.$store.state.currChatIndex;
    },
    sendMsg() {
      return this.$store.state.sendMsg;
    },
    chatObj() {
      return this.$store.state.chatObj;
    },
    kfList() {
      return this.$store.state.kfList;
    },
    startNum() {
      return this.$store.state.startNum;
    }
  },
  data() {
    return {
      // 导航栏切换
      navActive: 0,
      //公司信息
      company: new Object(),
      //下载列表
      loadarr: new Array(),
      //产品列表
      productarr: new Array(),
      //产品推荐列表
      productlist: new Array(),
      //群聊聊天记录
      message: new Array(),
      //用户是否登录
      isLogin: userLogin.loginType,
      //展台显示方式 1:视频，2图集
      displayType: 1,
      //视频集锦
      vodList: new Array(),
      //轮播图集集锦
      picArr: new Array(),
      //直播录播url
      vodName: "",
      //普通直播url
      hlsDownstream: "",
      //ppt直播显示图片
      pptImg: "",
      //房间状态 10:加载中 0视频直播 1ppt直播 2直播录播 3视频点播 4图集
      model: 10,
      //展台信息
      exhibition: new Object(),
      //展台公告
      bulletin: "",
      //展商所有展台id
      exhibitorList: new Array(),
      //下一站台地址
      downLink: "javascript:;",
      //上一站台地址
      upLink: "javascript:;",
      //是否交换过名片
      iscard: 0,
      //展台名称
      companyName: "",
      visitMode: 0 //开启游客模式，0否，1是
    };
  },

  methods: {
    navChange: function(num) {
      this.navActive = num;
    }
  },
  mounted: function() {
    document.getElementsByTagName("body")[0].style.height =
      window.innerHeight + "px";

    var $this = this;
    var page = 0;
    var prefix = "";
    var pages;
    let num = -1;
    window.socketLink = function() {
      if (window.WebSocket) {
        window.webSocket = socket();
        webSocket.onopen = function() {
          //发送信息请求
          send();
        };

        webSocket.onerror = function(evt) {
          //socketLink()
        };

        webSocket.onclose = function() {
          socketLink();
        };

        webSocket.onmessage = function(d) {
          let str = d.data;
          let num = str.slice(0, 5);
          let data = str.substr(5);
          data = eval("(" + data + ")");
          console.log(num);
          console.log(data);

          switch (num) {
            case "20001":
              $this.visitMode = data.body.booth.visitMode;

              if ($this.visitMode) {
                $this.$store.dispatch("isPrivateChat", true);
                $this.$store.dispatch("currChatIndex", 0);
              } else {
                $this.$store.dispatch("isPrivateChat", false);
              }

              //会员模式下，允许游客进入展台，10秒后弹出登录提示
              // 游客进入游客模式展台，10秒后不应弹出登录弹框
              if ($this.visitMode == 0 && $this.isLogin == 2) {
                setTimeout(() => {
                  noLogin();
                  $(".login-title").html("请登录后继续观看");
                }, 10000); // 10000
              }

              //展台logo
              $this.company.logoUrl = data.body.booth.logoUrl;

              //展台公告
              if (data.body.booth.bulletin)
                $this.bulletin = data.body.booth.bulletin.replace(/<br>/, "");
              //展台信息
              $this.exhibition = data.body.exhibition;

              //展台显示方式
              $this.displayType = data.body.booth.displayType;

              //是否已进行名片交换
              if ($this.isLogin == 1) {
                if (data.body.user.isCardExchange)
                  $this.iscard = 1; //已登录已交换
                else $this.iscard = 2; //已登录未交换
              }
              $this.companyName = data.body.booth.companyName;

              //视频
              if ($this.displayType == 1) {
                let url1 = getString("0046");
                webSocket.send(url1);
              } else if ($this.displayType == 2) {
                //图集
                let url2 = getString("0052");
                webSocket.send(url2);
              }
              break;
            //公司介绍消息
            case "20013":
              // 公司介绍
              $this.company.profile = data.body.companyProfile;
              // 公司主营
              $this.company.product = data.body.product;
              //二维码全路劲
              $this.company.codeurl = data.body.qrCodeUrl;
              break;
            //产品列表消息
            case "20035":
              $this.productarr = data.body;

              for (let i = 0; i < data.body.length; i++) {
                let arr = data.body[i];
                for (let m = 0; m < arr.length; m++) {
                  if (arr[m].recommendExhibitor) {
                    $this.productlist.push(arr[m]);
                  }
                }
              }
              break;
            case "20014":
              $this.loadarr = data.body.records;
              break;
            //展馆参展商列表消息
            case "20044":
              let $idIndex;
              for (let m = 0; m < data.body.length; m++) {
                var a = data.body[m];
                for (let i = 0; i < a.exhibitorList.length; i++) {
                  $this.exhibitorList.push(a.exhibitorList[i]);
                }
              }

              for (var n = 0; n < $this.exhibitorList.length; n++) {
                if (userLogin.boothId == $this.exhibitorList[n].boothId) {
                  $idIndex = n;
                }
              }

              if ($idIndex != 0) {
                $this.upLink =
                  "http://expo.ofweek.com/wap/booth/enter.xhtml?boothId=" +
                  $this.exhibitorList[$idIndex - 1].boothId +
                  "&mode=2";
              }

              if ($idIndex != $this.exhibitorList.length - 1) {
                $this.downLink =
                  "http://expo.ofweek.com/wap/booth/enter.xhtml?boothId=" +
                  $this.exhibitorList[$idIndex + 1].boothId +
                  "&mode=2";
              }
              break;
            //公司名片消息
            case "20036":
              //公司地址
              $this.company.address = data.body.address;
              //名片是否隐藏
              $this.company.hide = data.body.hide;
              //名片邮箱
              $this.company.email = data.body.email;
              //电话
              $this.company.telephone = data.body.telephone;
              //公司名
              $this.company.company = data.body.company;
              break;
            //客服列表
            case "20043":
              let arr = data.body;
              //排序 主客服排在所有客服的第一位
              arr.sort(function(a, b) {
                return b.mainService - a.mainService;
              });

              //给客服列表增加一个未读消息属性num(初始值0)
              arr.forEach(item => (item.num = 0));
              console.log("列表-------------------》");
              console.log(arr);
              let pHistoryurl = "";
              //页面初始化默认加载第一个客服的历史聊天记录
              if ($this.isLogin == 1) {
                pHistoryurl = getString("0075", {
                  receiverId: arr[0].id,
                  start: $this.startNum,
                  size: 20
                });
              } else {
                pHistoryurl = getString("0077", {
                  receiverId: arr[0].id,
                  start: $this.startNum,
                  size: 20
                });
              }

              webSocket.send(pHistoryurl);
              $this.$store.commit("getStartNum", $this.startNum + 20);

              $this.$store.dispatch("kfList", arr);

              break;
            //群聊消息推送
            case "20008":
              data.body.content = lookimg(data.body.content);
              $this.message.push(data.body);
              break;
            //私聊消息响应
            case "20003":
              break;
            //私聊消息推送
            case "20004":
              //显示未读消息的数量 此接口里userId对应客服列表里 id，数量显示在这个id的客服上
              if ($this.chatObj.id != data.body.author.userId) {
                $this.kfList.forEach(item => {
                  if (item.id == data.body.author.userId) {
                    item.num++;
                    $this.$store.dispatch("kfList", $this.kfList);
                  }
                });
              } else {
                data.body.content = lookimg(data.body.content);
                $this.$store.dispatch("addPrivateMes", data.body);
              }

              break;

            //游客私聊消息推送
            case "20006":
              //显示未读消息的数量 此接口里userId对应客服列表里 id，数量显示在这个id的客服上
              if ($this.chatObj.id != data.body.author.userId) {
                $this.kfList.forEach(item => {
                  if (item.id == data.body.author.userId) {
                    item.num++;
                    $this.$store.dispatch("kfList", $this.kfList);
                  }
                });
              } else {
                data.body.content = lookimg(data.body.content);
                $this.$store.dispatch("addPrivateMes", data.body);
              }

              break;

            //群聊历史消息
            case "20065":
              data.body.forEach(item => {
                if (item.operateType != undefined) {
                  if (item.operateType == 0) {
                    item.content = "进入展台";
                  }
                  if (item.operateType == 1) {
                    item.content = "提交了新的留言";
                  }
                  if (item.operateType == 2) {
                    item.content = "申请了样品";
                  }
                  if (item.operateType == 3) {
                    item.content = "下载了资料";
                  }
                  if (item.operateType == 4) {
                    item.content = "给展台点了一个赞！";
                  }
                  if (item.operateType == 5) {
                    item.content = "交换了名片";
                  }
                } else {
                  item.content = lookimg(item.content);
                }
                $this.message.push(item);
              });

              break;
            //私聊历史消息
            case "20075":
              if (data.status == 400 || !data.body.length) {
                let mes = {};
                mes.content = "请问有什么可以帮到您？";
                mes.author = {};
                mes.author.userType = 3;
                $this.$store.dispatch("addPrivateHistoryMes", mes);
              }

              var slidemore = document.querySelector(".slideMore");

              if (!data.body.length) {
                $this.$store.commit("noChatMsg", true);
                slidemore.innerHTML = "没有更多了";
                return;
              }
              if (data.body.length < 20) {
                slidemore.innerHTML = "没有更多了";
                $this.$store.commit("noChatMsg", true);
              } else {
                $this.$store.commit("noChatMsg", false);
                slidemore.innerHTML = "下拉刷新";
              }

              data.body.forEach(item => {
                item.content = lookimg(item.content);
                $this.$store.dispatch("addPrivateHistoryMes", item);
              });

              break;

            //游客私聊历史消息
            case "20077":
              if (data.status == 400 || !data.body.length) {
                let mes = {};
                mes.content = "请问有什么可以帮到您？";
                mes.author = {};
                mes.author.userType = 3;
                $this.$store.dispatch("addPrivateHistoryMes", mes);
              }

              var slidemore = document.querySelector(".slideMore");

              if (!data.body.length) {
                $this.$store.commit("noChatMsg", true);
                slidemore.innerHTML = "没有更多了";
                return;
              }
              if (data.body.length < 20) {
                slidemore.innerHTML = "没有更多了";
                $this.$store.commit("noChatMsg", true);
              } else {
                $this.$store.commit("noChatMsg", false);
                slidemore.innerHTML = "下拉刷新";
              }

              data.body.forEach(item => {
                item.content = lookimg(item.content);
                $this.$store.dispatch("addPrivateHistoryMes", item);
              });

              break;
            //2.31用户展台内操作通知消息
            case "20067":
              let isType = data.body.type;
              if (isType == 1) {
                console.log("留言成功");
                var arr1 = {
                  content: data.body.user.name + "提交了新的留言",
                  author: { name: "" }
                };
                $this.message.push(arr1);
              }
              if (isType == 2) {
                console.log("样品申请");
                $this.message.push({
                  content: data.body.user.name + "申请了样品",
                  author: { name: "" }
                });
              }

              if (isType == 3) {
                console.log("资料下载");
                $this.message.push({
                  content: data.body.user.name + "下载了资料",
                  author: { name: "" }
                });
              }

              if (isType == 4) {
                console.log("点赞");
                $this.message.push({
                  content: data.body.user.name + "给展台点了一个赞！",
                  author: { name: "" }
                });
              }

              if (isType == 5) {
                console.log("名片交换");
                $this.message.push({
                  content: data.body.user.name + "交换了名片",
                  author: { name: "" }
                });
              }

              break;
            //获取房间视频信息
            case "20046":
              $this.vodList = data.body;
              window.vodArr = data.body;
              if ($this.model == 10) {
                $this.model = 3;
              }
              break;
            //获取房间图集
            case "20052":
              $this.picArr = data.body;
              if ($this.model == 10) {
                $this.model = 4;
              }
              break;
            //推送直播流
            case "20810":
              //普通直播
              if (data.body.type == "live") {
                $this.hlsDownstream = data.body.hlsDownstream;
                $this.model = 0;
              } else {
                //ppt直播
                let pptId = data.body.pptId;
                $this.hlsDownstream = data.body.hlsDownstream;
                page = data.body.page;
                let url = getString("0059", { id: pptId });
                webSocket.send(url);
                $this.model = 1;
              }
              break;
            //推送录播视频
            case "20812":
              $this.vodName = data.body.vodName;
              $this.model = 2;
              break;
            //关闭直播
            case "20801":
              if ($this.displayType == 1) $this.model = 3;
              else $this.model = 4;
              break;
            //关闭直播录播
            case "20803":
              if ($this.displayType == 1) $this.model = 3;
              else $this.model = 4;
              break;
            //获取ppt信息
            case "20059":
              prefix = data.body.prefix;
              pages = data.body.pages;
              $this.pptImg = prefix + pages[page - 1].url;
              break;
            //ppt直播切换列表
            case "20804":
              page = data.body.page;
              $this.pptImg = prefix + pages[page - 1].url;
              break;
            //用户进入展台
            case "20025":
              $this.message.push({
                content: data.body.user.name + "进入了展台",
                author: { name: "" }
              });
              break;
          }
        };
      }
    };
    socketLink();
  }
};
</script>

<style>
#app {
  height: 100%;
}
</style>