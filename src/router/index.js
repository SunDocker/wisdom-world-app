import VueRouter from "vue-router";
import Index from "@/views";
import Home from "@/Home";
import IdeaAllCategory from "@/views/category/IdeaAllCategory";
import IdeaCategoryTag from "@/views/idea/IdeaCategoryTag";
import IdeaView from "@/views/idea/IdeaView";
import Register from "@/views/Register";
import store from '@/store'
import {Message} from "element-ui";
import Login from "@/views/Login";
import IdeaArchive from "@/views/idea/IdeaArchive";
import IdeaWrite from "@/views/idea/IdeaWrite";
import SelfPage from "@/views/SelfPage";
import Record from "@/components/selfpage/Record";
import Collect from "@/components/selfpage/Collect";

const router = new VueRouter({
    routes: [
        {
            path: '/write/:id?/:extend?',
            component: IdeaWrite,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/selfPage',
            component: SelfPage,
            children: [
                {
                    path: 'record',
                    component: Record
                },
                {
                    path: 'collect',
                    component: Collect
                }
            ]
        },
        {
            path: '',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/',
                    name: 'View',
                    component: Index
                },
                {
                    path: '/:type/all',
                    name: 'ideaAllCategory',
                    component: IdeaAllCategory
                },
                {
                    path: '/view/:id',
                    component: IdeaView
                },
                {
                    path: '/:type/:id',
                    component: IdeaCategoryTag
                },
                {
                    path: '/archives/:year?/:month?',
                    component: IdeaArchive,

                },
            ]
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
    ]
})

router.beforeEach((to, from, next) => {
        if (to.meta && to.meta.requireLogin) {
            if (store.state.token) {
                if (!store.state.account) {
                    store.dispatch('getUserInfo').then(() => {
                        next()
                    }).catch((err) => {
                        console.warn(err)
                    });
                } else {
                    next();
                }
            } else {
                Message.warning('请先注册并登录哦');
                //next(from)
            }
        } else if (to.path === '/login') {
            if (!store.state.token) {
                next();
            } else {
                if (!store.state.account) {
                    store.dispatch('getUserInfo').then(() => {
                        Message.success('已经为您自动登录了呢~');
                    }).catch(() => {
                        next()
                    });
                } else {
                    Message.info('已经登录过了呢~');
                }
            }
        } else {
            if (!store.state.token) {
                next();
            } else {
                if (!store.state.account) {
                    store.dispatch('getUserInfo').then(() => {
                        next()
                    }).catch(() => {
                        next()
                    });
                } else {
                    next()
                }
            }
        }
    }
)

export default router