//定义表情符
export const lookUrl = "http://live.ofweek.com/static/web/wap/live/assets/"
export const look = ['调皮','憨笑','呲牙','偷笑','大兵','色','惊恐','疑问','晕','惊讶','再见','玫瑰','抱拳','握手','OK','强','胜利','咖啡']
//export const look = ["smile", "biggrin", "lol", "titter", "db", "se", "jk", "yiw", "yun", "shocked", "zj", "mg", "bq", "handshake", "hd", "qiang", "victory", "kf"]
//表情过滤正则
export const rex = /\[(.+?)\]/g

//表情地址
export const lookStr = {
	'[调皮]':'smile',	
	'[憨笑]':'biggrin',
	'[呲牙]':'lol',
	'[偷笑]':'titter',
	'[大兵]':'db',
	'[色]':'se',
	'[惊恐]':'jk',
	'[疑问]':'yiw',
	'[晕]':'yun',
	'[惊讶]':'shocked',
	'[再见]':'zj',
	'[玫瑰]':'mg',
	'[抱拳]':'bq',
	'[握手]':'handshake',
	'[OK]':'OK',
	'[强]':'qiang',
	'[胜利]':'victory',
	'[咖啡]':'kf'
}
const size = 10
const start = 0
// 获取时间戳
export function newDate(){
	return new Date().getTime()
}

//未登录弹窗开启
export function noLogin(){
	let pop = document.getElementById("pop")
	let diaglog = document.getElementById("diaglog")
	pop.style.display = "block"
	diaglog.style.display = "block"

    videoPause("#lbVideo");    
    videoPause("#liveVideo");    
    videoPause("#ppTVideo");    
    videoPause("#ppTVideo");    

}
 function videoPause(ele){
    if($(ele).length){
        $(ele).hide();
        $(ele).get(0).pause();
    }
}
	

export function showVideos(){
    $("#lbVideo").show();    
    $("#liveVideo").show();    
    $("#ppTVideo").show();    
    $("#ppTVideo").show();    
}

//公告滚动
export function scrollLeft(warp, content, delay) {
    var div = document.getElementById(warp),
        ul = document.getElementById(content),
        _divWidth = div.offsetWidth,  //外层宽度
        _ulWidth = ul.offsetWidth,  //内层宽度
        t = parseInt(_ulWidth/delay); //一次滚动的时间
    //不满足滚动条件
    if( _divWidth > _ulWidth ) {
        return false;
    }

    //设置动画属性
    ul.style.transform = 'translate(' + -_ulWidth + 'px, 0)';
    ul.style.transition = 'transform ' + t + 's linear';

   setTimeout(function() {
        //重置动画属性
        ul.style.transform = 'translate(' + _divWidth + 'px, 0)';
        ul.style.transition = '';
        scrollLeft(warp, content, delay);
    }, t*1000);
}

//表情过滤
//export function lookimg(value){
//    for (let index = 0; index < look.length; index++){
//        if(value.indexOf('/'+look[index]) != -1){
//            let replaceStr = '/'+look[index]
//            value = value.replace(new RegExp(replaceStr,'gm'),'<img src="http://live.ofweek.com/static/web/wap/live/assets/'+look[index]+'.png">')
//        }
//    }
//    return value
//}
// 表情过滤
export function lookimg(value){
	let val = value.replace(rex,function(d){
		var str = d.replace(/[\[\]]/g,'');
		for(let i = 0;i<look.length;i++){
			if(str == look[i]){
				return '<img src="http://live.ofweek.com/static/web/wap/live/assets/'+lookStr[d]+'.png" >'
			}
		}
		return d
	})
    return val
}

// 把时间戳转为为普通日期格式
export function date(format, timestamp){   
    var a, jsdate=((timestamp) ? new Date(timestamp) : new Date());  
    var ret;
    var pad = function(n, c){  
        if((n = n + "").length < c){  
            return new Array(++c - n.length).join("0") + n;  
        } else {  
            return n;  
        }  
    };  
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};  
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
	var f = {  
        d: function(){return pad(f.j(), 2)},  
        D: function(){return f.l().substr(0,3)},  
        j: function(){return jsdate.getDate()},  
        l: function(){return txt_weekdays[f.w()]},  
        N: function(){return f.w() + 1},  
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},  
        w: function(){return jsdate.getDay()},  
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},  
        W: function(){  
            var a = f.z(), b = 364 + f.L() - a;  
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;  
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){  
                return 1;  
            } else{  
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){  
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");  
                    return date("W", Math.round(nd2.getTime()/1000));  
                } else{  
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);  
                }  
            }  
        },  
        F: function(){return txt_months[f.n()]},  
        m: function(){return pad(f.n(), 2)},  
        M: function(){return f.F().substr(0,3)},  
        n: function(){return jsdate.getMonth() + 1},  
        t: function(){  
            var n;  
            if( (n = jsdate.getMonth() + 1) == 2 ){  
                return 28 + f.L();  
            } else{  
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){  
                    return 31;  
                } else{  
                    return 30;  
                }  
            }  
        },  
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},  
        Y: function(){return jsdate.getFullYear()},  
        y: function(){return (jsdate.getFullYear() + "").slice(2)},  
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},  
        A: function(){return f.a().toUpperCase()},  
        B: function(){  
            var off = (jsdate.getTimezoneOffset() + 60)*60;  
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;  
            var beat = Math.floor(theSeconds/86.4);  
            if (beat > 1000) beat -= 1000;  
            if (beat < 0) beat += 1000;  
            if ((String(beat)).length == 1) beat = "00"+beat;  
            if ((String(beat)).length == 2) beat = "0"+beat;  
            return beat;  
        },  
        g: function(){return jsdate.getHours() % 24 || 24},  
        G: function(){return jsdate.getHours()},  
        h: function(){return pad(f.g(), 2)},  
        H: function(){return pad(jsdate.getHours(), 2)},  
        i: function(){return pad(jsdate.getMinutes(), 2)},  
        s: function(){return pad(jsdate.getSeconds(), 2)},  
        O: function(){  
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);  
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;  
            return t;  
        },  
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},  
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},  
        U: function(){return Math.round(jsdate.getTime()/1000)}  
    };  
          
    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){  
        if( t!=s ){  
            // escaped  
            ret = s;  
        } else if( f[s] ){  
            // a date function exists  
            ret = f[s]();  
        } else{  
            // nothing special  
            ret = s;  
        }  
        return ret;  
    });  
}  

// 返回请求string
export function getString(msgNo,obj){
	switch (msgNo) {
		case '0001': 			//login
			let url1 = '1'+msgNo+'{"timestamp":'+newDate()
			+',"body":{"loginType":'+obj.loginType
			+',"userId":'+obj.userId+',"boothId":'+obj.boothId
			+',"nonce":"'+obj.nonce
			+'","mode":'+obj.mode
			+',"ak":"'+obj.ak+'","clickFrom":"'+obj.clickFrom+'"},"msgId":""}'
			return url1
			break
        //公司介绍
		case '0013': 			
			let url2 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"4"}'
			return url2
			break
        //获取产品列表消息
        case '0035':
            let url3 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"7"}'
            return url3
            break
        //资料与白皮书消息
        case '0014':
            let url4 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"4"}'
            return url4
            break
        //展馆参展商列表消息
        case '0044':
            let url5 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"2"}'
            return url5
            break
        //公司名片消息
        case '0036':
            let url6 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"13"}'
            return url6
            break       
        //获取展台客服列表消息
        case '0043':
            let url7 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"5"}'
            return url7
            break
        //发送群聊信息
        case '0007':
            let url8 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"content":"'+obj.content+'"},"msgId":"41"}'
            return url8
            break
        
        //获取群聊历史记录
        case '0065':
            let url9 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"start":'+start+',"size":'+size+'},"msgId":"9"}'
            return url9
            break
        //申请样品
        case '0047':
            let url10 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"applicantId":'+obj.applicantId+',"purpose":"'+obj.purpose+'","productIdList":["'+obj.productIdList+'"]},"msgId":"9"}'
            return url10
            break
        //留言咨询
        case '0011':
            let url11 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"receiverId":'+obj.receiverId+',"content":"'+obj.content+'","subject":["'+obj.subject+'"],"boothId":'+obj.boothId+'},"msgId":"11"}'
            return url11
            break
        //获取房间视频信息
        case '0046':
            let url12 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"3"}'
            return url12
            break
        //获取当前图集
        case '0052':
            let url13 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"3"}'
            return url13
            break
        //获取ppt信息
        case '0059':
            let url14 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"id":'+obj.id+'},"msgId":"3"}'
            return url14
            break
        //下载资料
        case '0068':
            let url15 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":"12"}'
            return url15
            break
        //名片交换
        case '0066':
            let url16 = '1' + msgNo+'{"timestamp":'+newDate()+',"body":{"waiterId":"'+obj.waiterId+'","targetType":'+obj.targetType+'},"msgId":"12"}'
            return url16
            break
        
        //发送私聊信息
        case '0003':
            let url17 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"content":"'+obj.content+'","receiverId":"'+obj.receiverId+'","boothId":"'+obj.boothId+'"},"msgId":"40"}'
            return url17
            break

        //私聊历史消息
        case '0075':
            let url18 = '1' + msgNo+'{"timestamp":'+newDate()+',"body":{"receiverId":"'+obj.receiverId+'","start":'+obj.start+',"size":'+obj.size+'},"msgId":"9"}'
            return url18
            break
        //游客发送私聊信息
        case '0005':
            let url19 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"content":"'+obj.content+'","receiverId":"'+obj.receiverId+'","boothId":"'+obj.boothId+'"},"msgId":"40"}'
            return url19
            break

         //游客私聊历史消息
        case '0077':
            let url20 = '1' + msgNo+'{"timestamp":'+newDate()+',"body":{"receiverId":"'+obj.receiverId+'","start":'+obj.start+',"size":'+obj.size+'},"msgId":"9"}'
            return url20
            break
	}
}

export function sortArr(arr){
    return arr.sort(function(a, b) {
        return a.chatTime - b.chatTime;
    });
}