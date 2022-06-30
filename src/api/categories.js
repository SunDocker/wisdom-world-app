import request from "@/request";

export function listCategories() {
    return request.get('/categories/detail')
}

export function getCategoryDetailById(id) {
    return request.get(`/categories/detail/${id}`)
}

export function getAllCategories() {
    return request.get(`/categories`)
}