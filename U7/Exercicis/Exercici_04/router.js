import Post from "./Components/Post.js";

let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes:[
        { path: '/', name: 'home', component: Post }
    ]
})

export default router;
