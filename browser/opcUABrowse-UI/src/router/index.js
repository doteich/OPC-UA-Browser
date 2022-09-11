import { createRouter, createWebHistory } from 'vue-router'
import browseView from "../views/browseView.vue"


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: browseView

        },

    ]
})

export default router