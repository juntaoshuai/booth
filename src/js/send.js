import {getString} from './common'
export const chatSize = 20		//初始化历史记录显示条数
export const picSize = 10       //初次加载图文列表显示条数

export default function(){
    //发送登录信息
    //增加推广id
    userLogin.clickFrom=getCookie("clickFrom")
    let url1 = getString('0001',userLogin)
    webSocket.send(url1)

    // 公司介绍信息
    let url2 = getString('0013')
    webSocket.send(url2)

    // 产品列表消息
    let url3 = getString('0035')
    webSocket.send(url3)

    // 资料与白皮书消息
    let url4 = getString('0014')
    webSocket.send(url4)

    //展馆参展商列表消息
    let url5 = getString('0044')
    webSocket.send(url5)

    //公司名片消息
    let url6 = getString('0036')
    webSocket.send(url6)

    //获取展台客服列表消息
    let url7 = getString('0043')
    webSocket.send(url7)

    //获取群聊历史记录
    let url8 = getString('0065')
    webSocket.send(url8)

    //获取展会所有boothId

}