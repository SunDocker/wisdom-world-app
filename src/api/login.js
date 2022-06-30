import request from "@/request";

export function register(user) {
    return request.post('/register', user)
}

export function getUserInfo() {
    return request.get('/users/currentUser')
}

export function logout() {
    return request.get('/user/logout')
}

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}