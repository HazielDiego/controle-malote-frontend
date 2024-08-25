<template>
    <div class="exception-body error">
        <div class="exception-panel"></div>

        <div class="exception-content">
            <img :src="logoBlackHorizontal"
                 alt="babylon-layout" />
            <h1><span class="exception-name">OCORREU</span> UM ERRO</h1>
            <p>Algo deu errado.</p>
            <a @click="goDashboard"
               style="cursor: pointer">Voltar ao Dashboard</a>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logoBlackHorizontal = import.meta.env.VITE_APP_PATH_TO_LOGO_BLACK_HORIZONTAL;

const goDashboard = () => {
    router.push({ path: '/' });
}
</script>

<style scoped></style>
