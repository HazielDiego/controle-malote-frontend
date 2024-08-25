<template>
    <div :class="['layout-profile', { 'layout-profile-active': expanded }]">
        <button class="layout-profile-button p-link" @click="onClick">
            <div style="display: inline-block;">
                <div
                    style="width: 38px; height: 38px; display: flex; flex-direction: row; align-items: center; justify-content: center; background-color: white; border-radius: 50%;">
                    <img src="/img/user-avatar-profile.png" alt="babylon-layout" />
                </div>
            </div>
            <div class="layout-profile-userinfo">
                <span class="layout-profile-name">{{ getFirstAndLastWords(this.$store.state.userModule.user.nome)
                    }}</span>
                <span class="layout-profile-role">{{ this.$store.state.userModule.user.roles[0].nome.replace("ROLE_",
                    "") }}</span>
            </div>
            <i class="layout-profile-icon pi pi-angle-down"></i>
        </button>

        <transition name="layout-profile-menu">
            <ul class="layout-profile-menu" v-show="expanded">
                <li role="menuitem">
                    <button class="p-link" :tabIndex="expanded ? null : '-1'" @click="goToPerfil">
                        <i class="pi pi-user"></i>
                        <span>Perfil</span>
                    </button>
                </li>                
                <li role="menuitem">
                    <button class="p-link" :tabIndex="expanded ? null : '-1'" @click="efetuarLogout">
                        <i class="pi pi-sign-out"></i>
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import store from '@/store';
import router from '@/router';

export default {
    emits: ['profile-click'],
    props: {
        expanded: {
            type: Boolean,
            default: null,
        },
    },
    methods: {
        onClick(event) {
            this.$emit('profile-click', event);
            event.preventDefault();
        },
        efetuarLogout() {
            store.dispatch('userModule/logout');
        },
        goToPerfil() {
            router.push({ name: "perfil" })
        },
        getFirstAndLastWords(str) {
            // Divida a string em palavras usando o espaço como delimitador
            const words = str.split(' ');

            // Verifique se a string contém pelo menos uma palavra
            if (words.length === 0) {
                return '';
            }

            // Pegue a primeira palavra
            const firstWord = words[0];

            // Pegue a última palavra
            const lastWord = words[words.length - 1];

            // Retorne a concatenação da primeira e última palavra com um espaço entre elas
            return `${firstWord} ${lastWord}`;
        }
    },
    name: 'AppInlineProfile',
};
</script>

<style scoped></style>
