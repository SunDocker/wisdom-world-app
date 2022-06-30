//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//应用vuex
Vue.use(Vuex)

import {getUserInfo, login, logout, register} from "@/api/login";
import {Message} from "element-ui";

//响应组件中的动作
const actions = {
    register({commit}, user) {
        //Promise 对象代表了未来将要发生的事件，用来传递异步操作的消息。
        //rejected: 意味着操作失败。
        return new Promise((resolve, reject) => {
            // 异步处理
            // 处理结束后、调用resolve 或 reject
            // 当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
            register(user).then((res) => {
                if (res.data.success) {
                    commit('SET_TOKEN', res.data.data)
                    localStorage.setItem('token', res.data.data)
                    resolve()
                } else {
                    reject(res.data.msg)
                }
            }).catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    },
    getUserInfo({dispatch, commit}) {
        return new Promise((resolve, reject) => {
            getUserInfo().then((res) => {
                if (res.data.success) {
                    commit('SET_ACCOUNT', res.data.data.account)
                    commit('SET_NAME', res.data.data.nickname)
                    commit('SET_AVATAR', res.data.data.avatar)
                    commit('SET_ID', res.data.data.id)
                    resolve()
                } else {
                    commit('SET_ACCOUNT', undefined)
                    commit('SET_NAME', undefined)
                    commit('SET_AVATAR', undefined)
                    commit('SET_ID', undefined)
                    dispatch('removeToken')
                    Message.warning('登录已过期，请重新登录')
                    reject(res.data.msg)
                }
            }).catch((error) => {
                Message.error('系统错误')
                reject(error)
            })
        })
    },
    removeToken({commit}) {
        commit('SET_TOKEN', undefined)
        localStorage.removeItem('token')
    },
    logout({dispatch, commit}) {
        return new Promise(((resolve, reject) => {
            logout().then((res) => {
                if (res.data.success) {
                    commit('SET_ACCOUNT', undefined);
                    commit('SET_NAME', undefined);
                    commit('SET_AVATAR', undefined);
                    commit('SET_ID', undefined);
                    dispatch('removeToken');
                    resolve();
                } else {
                    Message.warning(res.data.msg);
                    reject(res.data.msg)
                }
            }).catch(err => {
                Message.error('系统错误')
                reject(err)
            });
        }));
    },
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            login(user).then(res => {
                if(res.data.success){
                    commit('SET_TOKEN', res.data.data)
                    localStorage.token=res.data.data;
                    resolve()
                }else{
                    reject(res.data.msg)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
}
//操作数据
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ACCOUNT: (state, account) => {
        state.account = account
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ID: (state, id) => {
        state.id = id
    }
}
//存储数据
const state = {
    id: undefined,
    account: undefined,
    name: undefined,
    avatar: undefined,
    token: localStorage.getItem('token'),
}
//创建并导出store
export default new Vuex.Store({
    //属性简写
    actions,
    mutations,
    state
})