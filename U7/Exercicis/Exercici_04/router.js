import Post from "./Components/Post.js";

let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes:[
        { path: '/post/:id', name: 'post', component: Post }
    ]
});

export default router;
