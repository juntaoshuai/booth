import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    kfList:[],
    isPrivateChat:false,
    chatObj:{}, //当前聊天客服或展商对象
    privateMessage:[], //私聊消息
    currChatIndex:-1,
    startNum:0, //私聊历史消息开始数
    noChatMsg:false
  }

const getters={
    sortPrivateMessage(state){
        return state.privateMessage.sort(function(a, b) {
            return a.chatTime - b.chatTime;
        });
    }
}

const mutations = {
    //得到客服
    kfList(state,kf){
       state.kfList=kf;
    },
    isPrivateChat(state,bool){
        state.isPrivateChat=bool;
    },
    chatObj(state,obj){
       state.chatObj=obj;
    },
    currChatIndex(state,index){
       state.currChatIndex=index;
    },
    addPrivateMes(state,mesobj){
      state.privateMessage.push(mesobj);
    },
    addPrivateHistoryMes(state,mesobj){
      state.privateMessage.unshift(mesobj)
    },
    clearPrivateMes(state){
       state.privateMessage=[];
       state.startNum=0;
    },
    getStartNum(state,snum){
      state.startNum=snum;
    },
    noChatMsg(state,bool){  
      state.noChatMsg=bool;
    }

}
const actions={
  //得到客服
    kfList({commit},kf){
       commit('kfList',kf);
    },
    isPrivateChat({commit},bool){
        commit('isPrivateChat',bool);
    },
    chatObj({commit},obj){
       commit('chatObj',obj);
    },
    currChatIndex({commit},index){
        commit('currChatIndex',index);
    },
    addPrivateMes({commit},mesobj){
       commit('addPrivateMes',mesobj);
    },
    addPrivateHistoryMes({commit},mesobj){
      commit('addPrivateHistoryMes',mesobj);
    }

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})



