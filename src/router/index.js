import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);


import home from '@/pages/home'
import login from '@/pages/login'
import register from '@/pages/register'
import detailss from '@/pages/detailss'
import system from '@/pages/system'
import bulletinSystem from '@/pages/bulletinSystem'
import articleSystem from '@/pages/articleSystem'
import commentSystem from '@/pages/commentSystem'
import userSystem from '@/pages/userSystem'
import create from '@/pages/create'
import revise from '@/pages/revise'

//奇怪的报错，用这个就奇怪的处理掉了诶!

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {undefined
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes:[
        {
            path:"/",
            name: 'Index',
            redirect:'/home'
        },
        {
            path:"/home",
            name:"home",
            component:home,
            meta:{isAuth:true}
        },
        {
            path:"/login",
            name:"login",
            component:login,
            meta:{isAuth:false}
        },
        {
            path:"/register",
            name:"register",
            component:register,
            meta:{isAuth:false}
        },
        {
            path:"/detailss",
            name:"detailss",
            component:detailss,
            meta:{isAuth:true}
        },
        {
            path:"/system",
            name:"system",
            component:system,
            meta:{isAuth:true},
            beforeEnter:(to, from,next) => {
                if(localStorage.getItem('username')==='admin') {
                    next()
                }else {
                    alert('无权访问')
                }
            },
            redirect:"/system/articleSystem",
            children:[
                {
                    path:'bulletinSystem',
                    component:bulletinSystem,
                },
                {
                    path:'articleSystem',
                    component:articleSystem,
                },
                {
                    path:'commentSystem',
                    component:commentSystem,
                },
                {
                    path:'userSystem',
                    component:userSystem,
                },
                {
                    path:'create',
                    component:create,
                },
                {
                    path:'revise',
                    component:revise,
                },
            ]
        }
    ]
})

router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth) {
        if(localStorage.getItem('token')==null) {
            alert('未登录用户无法访问')
            next('/login')
        }
        else {
            next()
        }
    } else {
        next()
    }
})

export default router