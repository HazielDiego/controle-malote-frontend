import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import store from '../store';
const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'dashboard',
                exact: true,
                component: () => import('@/views/Dashboard.vue'),
                meta: {
                    breadcrumb: [{ label: 'Dashboard' }],
                    requiresAuth: true,
                    allowedRoles: [
                        "ROLE_ADMIN",
                        "ROLE_USER"
                    ]
                },
            },
            {
                path: '/perfil',
                name: 'perfil',
                exact: true,
                component: () => import('@/views/Perfil.vue'),
                meta: {
                    breadcrumb: [{ label: 'Perfil' }],
                    requiresAuth: true,
                    allowedRoles: [
                        "ROLE_ADMIN",
                        "ROLE_USER"
                    ]
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/pages/Login.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/views/pages/Logout.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/retorno-login',
        name: 'retorno-login',
        component: () => import('@/views/pages/RetornoLogin.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('@/views/pages/Error.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('@/views/pages/Access.vue'),
        meta: {
            requiresAuth: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
});

router.beforeEach(async (to, from, next) => {

    //VERIFICA SE O USUARIO ESTÁ AUTENTICADO
    const isAuthenticated = await store.dispatch('userModule/isAuthenticated', {}, { root: true });

    // SE ESTIVER AUTENTICADO
    // ATUALIZA O TOKEN
    let temPermissao = true
    if (isAuthenticated) {
        // VERIFICA SE TEM PERMISSAO PARA ACESSAR A ROTA    
        if (to.meta.requiresAuth == true) {
            const userModule = await store.state.userModule;
            const userRoles = userModule.user.roles.map(userRole => userRole.nome)
            const allowedRoles = to.meta.allowedRoles
            temPermissao = userRoles.some(role => allowedRoles.includes(role));
        }
        // ATUALIZA O TOKEN A CADA PAGINA ACESSADA
        store.dispatch('userModule/refreshToken', {}, { root: true })
    }

    // SE ESTIVER AUTENTICADO E TENTAR ACESSAR UMA ROTA QUE PRECISA DE AUTENTICAÇÃO
    // MAS NAO TEM PERMISSAO DE ACESSO A ROTA 
    // REDIRECIONA PARA O LOGIN
    if (isAuthenticated && to.matched.some(record => record.meta.requiresAuth === true && !temPermissao)) {
        next("/Access");
    }

    // SE NÃO ESTIVER AUTENTICADO E TENTAR ACESSAR UMA ROTA QUE PRECISA DE AUTENTICAÇÃO
    // REDIRECIONA PARA O LOGIN
    if (!isAuthenticated && to.matched.some(record => record.meta.requiresAuth === true)) {
        next("/login");
    }

    next();
})

export default router;
