import request from "@/request";

export function getCommentList(id) {
    return request.get(`comments/idea/${id}`)
}

export function publishComment(params) {
    return request.post(`comments/publish`, params)
}
