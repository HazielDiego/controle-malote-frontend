<template>
    <div class="my-login-body md:flex md:justify-content-center md:align-items-center">
        <!-- TOP HEADER -->
        <div
             style="height: 80px; padding: 5px; width: 100%; background: linear-gradient(to right, #000444, #ffffff); position: absolute; top: 0; left: 0; text-align: right;">
            <img src="/img/LogoSedec.svg"
                 alt="LOGO"
                 style="height: 100%;">
        </div>

        <div class="bg-white p-5 pt-5 border-round-lg "
             style="margin-top: 80px;">

            <slot></slot>

            <div class="grid"
                 v-if="router.currentRoute._value.path != '/login'">
                <div class="col-12 flex justify-content-center align-items-center">
                    <div class="bg-secondary-subtle"
                         style="height: 2px; width: 70%;"></div>
                </div>
            </div>
            <div class="grid"
                 v-if="props.botaoDeRetornoAtivo">
                <div class="col-12">
                    <Button label="Retornar para Login"
                            icon="pi pi-arrow-left"
                            rounded
                            severity="secondary"
                            @click="router.push({ name: 'login' })" />

                </div>
            </div>
        </div>
        <!-- BOTTOM FOOTER -->
        <div
             style="position: absolute; bottom: 0; left: 0; width: 100%; height: 30px;  border-top: 1px solid #d0d0d1; text-align: center; color: #878787; padding: 0.5rem 0;">
            Todos os direitos reservados à SEDEC
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    botaoDeRetornoAtivo: {
        type: Boolean,
        default: true
    }
});

const router = useRouter();
</script>
<style scoped>
.my-login-body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    background-color: white;
    background: white;
    width: 100%;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .my-login-body {
        padding: 0;
        margin: 0;
        min-height: 100vh;
        background-color: #eaeaeb;
        background-position: top right;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .my-login-body {
        background-size: cover;
        background-position: center;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {}
</style>