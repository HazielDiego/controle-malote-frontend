<template>
    <div class="layout-topbar clearfix">
        <button class="layout-topbar-logo p-link" @click="goDashboard">
            <img id="layout-topbar-logo" alt="babylon-layout" :src="logoWhiteHorizontal" />
        </button>

        <button class="layout-menu-button p-link" @click="onMenuButtonClick">
            <i class="pi pi-bars"></i>
        </button>

        <button id="topbar-menu-button" class="p-link" @click="onTopbarMenuButtonClick">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <ul :class="topbarItemsClass">
            <li v-if="profileMode === 'popup' || horizontal"
                :class="['user-profile', { 'active-topmenuitem': activeTopbarItem === 'profile' }]"
                @click="$emit('topbar-item-click', { originalEvent: $event, item: 'profile' })">
                <button class="p-link">
                    <img alt="babylon-layout" src="/img/user-avatar-profile.png" />
                </button>

                <transition name="layout-submenu-container">
                    <ul class="fadeInDown" v-show="activeTopbarItem === 'profile'">
                        <li role="menuitem">
                            <button class="p-link" @click="goToPerfil">
                                <i class="pi pi-user"></i>
                                <span>Perfil</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button class="p-link" @click="efetuarLogout">
                                <i class="pi pi-sign-out"></i>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </transition>
            </li>

            <li :class="[{ 'active-topmenuitem': activeTopbarItem === 'messages' }]"
                @click="$emit('topbar-item-click', { originalEvent: $event, item: 'messages' })">
                <button class="p-link">
                    <i class="topbar-icon pi pi-inbox"></i>
                    <span class="topbar-item-name">Messages</span>
                    <span class="topbar-badge">8</span>
                </button>

                <transition name="layout-submenu-container">
                    <ul class="fadeInDown" v-show="activeTopbarItem === 'messages'">
                        <li role="menuitem" style="background-color: rgb(176, 134, 32, 0.3); border-radius: 3px;">
                            <button class="topbar-message p-link">
                                <i class="pi pi-exclamation-triangle" style="color: var(--yellow-700);"></i>
                                <span>Important Message</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button class="topbar-message p-link">
                                <img src="/layout/images/avatar-julia.png" alt="babylon-layout" />
                                <span>Reports attached</span>
                            </button>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
import store from '@/store';
import router from '@/router';
export default {
    props: {
        topbarMenuActive: Boolean,
        activeTopbarItem: String,
        profileMode: String,
        horizontal: Boolean,
    },
    data() {
        return {
            logoWhiteHorizontal: import.meta.env.VITE_APP_PATH_TO_LOGO_WHITE_HORIZONTAL,
        };
    },
    methods: {
        onMenuButtonClick(event) {
            this.$emit('menubutton-click', event);
        },
        onTopbarMenuButtonClick(event) {
            this.$emit('topbar-menubutton-click', event);
        },
        goDashboard() {
            router.push({ name: 'dashboard' });
        },
        efetuarLogout() {
            store.dispatch('userModule/logout');
        },
        goToPerfil() {
            router.push({ name: "perfil" })
        }
    },
    computed: {
        topbarItemsClass() {
            return [
                'topbar-menu fadeInDown',
                {
                    'topbar-menu-visible': this.topbarMenuActive,
                },
            ];
        },
    },
};
</script>
