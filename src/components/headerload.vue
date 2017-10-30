<template>
	<header class="header_load" v-show="show">
		<img class="fl" src="../assets/load_logo.png" alt="">
		<div class="fl">
			<h2>下载OFweek客户端</h2>
			<p>更好的直播体验</p>
		</div>
		<span class="fr" @click="close">&times;</span>
		<a href="javascript:;" class="fr">打开APP</a>
	</header>
</template>

<script>
    export default {
        data () {
            return {
				show:true
            }
        },
        methods: {
			close:function(){
				this.show = false
			}
        },
        mounted(){
            function isIos () {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

function isAndroid () {
    return /(Android)/i.test(navigator.userAgent)
}

function isGreaterThan9 () {
    return (navigator.userAgent.match(/os\s+(\d+)/i)[1] - 0) > 8
}

function isChrome () {
    return navigator.userAgent.indexOf("Chrome") !== -1 
}

function isWechat () {
    return navigator.userAgent.match(/MicroMessenger/i) == "micromessenger"
}

function isQQ () {
    return navigator.userAgent.match(/QQ/i) == "qq"
}

//实际上就是新建一个iframe的生成器
var createIframe = (function () {
  var iframe;
    return function () {
        if (iframe) {
            return iframe;
        }
        else {
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            return iframe;      
        }
    }
})();

//增加通用链接的生成,
var baseScheme = "ofweekapp://",
    baseLink = "http://m.xxxx.com?";

var createScheme = function (options, isLink) {
    var urlScheme = isLink ? baseLink : baseScheme;
    for (var item in options) {
        urlScheme = urlScheme + item + '=' + options[item] + "&";
    }
    urlScheme = urlScheme.substring(0, urlScheme.length - 1);
    // return isLink ? urlScheme : encodeURIComponent(urlScheme);
    return urlScheme;
}

var openApp = function () {
    //生成你的scheme你也可以选择外部传入
    var localUrl = createScheme({enterType: 'booth', boothId:userLogin.boothId});
    var openIframe = createIframe();
    if (isIos()) {
        //判断是否是ios,具体的判断函数自行百度
        /*if (isGreaterThan9()) {
            //判断是否为ios9以上的版本,跟其他判断一样navigator.userAgent判断,ios会有带版本号
            localUrl = createScheme({enterType: 'live', roomID: 87}, true);//代码还可以优化一下
            location.href = localUrl;//实际上不少产品会选择一开始将链接写入到用户需要点击的a标签里
            return;
        }*/
        window.location.href = localUrl;
        var loadDateTime = Date.now();
        setTimeout(function () {
            var timeOutDateTime = Date.now();
            if (timeOutDateTime - loadDateTime < 1000) {
                window.location.href = "https://itunes.apple.com/cn/app/ofweek-%E9%AB%98%E7%A7%91%E6%8A%80%E9%97%A8%E6%88%B7-%E6%8F%90%E4%BE%9B%E9%AB%98%E7%A7%91%E6%8A%80%E5%85%A8%E8%A1%8C%E4%B8%9A%E8%B5%84%E8%AE%AF/id1168496600?mt=8";
            }
        }, 25);
    }
    else if (isAndroid()) {
        //判断是否是android，具体的判断函数自行百度
        if (isChrome()) {
            //chrome浏览器用iframe打不开得直接去打开，算一个坑
            window.location.href = localUrl;
        } else {
            //抛出你的scheme
            openIframe.src = localUrl;
        }
        setTimeout(function () {
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.mobile.ofweek";
        }, 500);
    }
    else {
        //主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊
        /*openIframe.src = localUrl;
        setTimeout(function () {
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.mobile.ofweek";
        }, 500);*/
    }
}
    $(".header_load a").click(function(){
        openApp();
    });
            
        }
    }
</script>

<style>
.header_load{height: .96rem;background: rgba(0,0,0,.8);padding:0 .25rem;position: absolute;z-index: 888888;left: 0;top: 0;width: 100%;color: #fff;}
.header_load img{width: .69rem;margin-top: .12rem;}
.header_load a{display: block;text-align: center;height: .5rem;line-height: .5rem;width: 1.3rem;background: #ce0808;color: #fff;font-size: .26rem;font-weight: bold;border-radius: .07rem;margin-top: .22rem;}
.header_load h2{font-size: .28rem;}
.header_load div.fl{margin-left: .12rem;margin-top: .16rem;}
.header_load p{font-size: .24rem;}	
.header_load span{font-size: .36rem;border:1px solid #fff;display: block;width: .56rem;height: .56rem;border-radius: 50%;line-height: .56rem;text-align: center;margin: .2rem 0 0 .1rem;}
</style>