<template>
    <div class="exception-body access-denied">
        <div class="exception-panel"></div>

        <div class="exception-content">
            <img :src="logo"
                 alt="babylon-layout" />
            <h1><span class="exception-name">ACESSO</span> NEGADO</h1>
            <p>Você não tem as permissões necessárias para acessar este recurso.</p>
            <a @click="goDashboard"
               style="cursor: pointer">Voltar para dashboard</a>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const logo = import.meta.env.VITE_APP_PATH_TO_LOGO_BLACK_HORIZONTAL

const router = useRouter();

const goDashboard = () => {
    router.push({ path: '/' });
}
</script>

<style scoped></style>
