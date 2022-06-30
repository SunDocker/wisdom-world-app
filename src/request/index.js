import axios from "axios"
import store from '@/store'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (store.state.token || localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token')
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
/*
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const res = response.data;

    //0 为成功状态
    if (res.code !== 200) {

        //20001 用户未登录
        if (res.code === 90002) {

            Message({
                type: 'warning',
                showClose: true,
                message: '未登录，请重新登录哦'
            })

            return Promise.reject('error');
        }
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});*/

axios.defaults.baseURL = 'http://localhost:8888'
// axios.defaults.timeout = 10000

export default axios
