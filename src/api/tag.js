import request from "@/request";

export function getHotTags() {
    return request.get('/tags/hot')
}

export function listTags() {
    return request.get('/tags/detail')
}

export function getTagDetailById(id) {
    return request.get(`/tags/detail/${id}`)
}

export function getAllTags() {
    return request.get('/tags')
}