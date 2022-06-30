import request from "@/request";

export function getIdeaCollectionByUser(id) {
    return request.get(`/ideas/collection/${id}`)
}


export function getIdeas(params) {
    return request.post('/ideas', params)
}


export function getHotIdeas() {
    return request.get('/ideas/hot')
}

export function getLatestIdeas() {
    return request.get('/ideas/latest')
}

export function getArchives() {
    return request.get('/ideas/listArchives')
}

export function getIdeaById(id) {
    return request.get(`/ideas/view/${id}`)
}

export function listArchives() {
    return request({
        url: '/ideas/listArchives',
        method: 'get'
    })
}

export function publishIdea(idea) {
    return request.post('/ideas/publish', idea)
}

export function updateIdeaBody(idea) {
    return request.put('/ideas/update', idea)
}

export function getIdeaTree(id) {
    return request.get(`/ideas/tree/${id}`)
}

export function searchIdea(search) {
    return request({
        url: '/ideas/search',
        method: 'get',
        params: {'search': search}
    })
}

export function getIdeasByAuthor(authorId) {
    return request.get(`/ideas/author/${authorId}`)
}

export function isCollected(uid, iid) {
    return request({
        url: '/ideas/isCollected',
        method: 'get',
        params: {
            uid,iid
        }
    })
}

export function collect(ideaId) {
    return request.post('/users/collect', {ideaId})
}

export function cancelCollection(ideaId) {
    return request.post('/users/cancelCollection', {ideaId})
}