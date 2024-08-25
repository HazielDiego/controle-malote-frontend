<script setup>
import SimplePageWithBackground from '@/components/SimplePageWithBackground.vue';
import { onMounted } from 'vue'
import { useStore } from 'vuex';
import axiosInstance from '../../axios-base-url';

const store = useStore();

const url_login = import.meta.env.VITE_APP_URL_LOGIN
const logar = () => {
    window.location.href = url_login
}
</script>
<template>
    <SimplePageWithBackground :botaoDeRetornoAtivo="false">
        <div class="grid">
            <div class="col-12 md:col-6">
                <img src="/img/Login-amico.svg"
                     style="height: 300px;"
                     alt="">
            </div>
            <div class="col-12 md:col-6">
                <div class="grid h-full">
                    <div class="col-12 flex flex-column justify-content-center h-full">
                        <div class="grid flex flex-column">
                            <div class="col-12">
                                <div class="py-2"
                                     style="font-size: 1.2rem; color: #495057;">
                                    <i class="pi pi-user pr-2"
                                       style="font-size: 2rem;"></i><span> Acessar SISTEMA
                                        XYZ</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div style="height: 0.5px; width: 100%; background-color: #adb5bd; border-radius: 8px;">
                                </div>
                            </div>
                            <div class="col-12">
                                <p style="color: #495057;">O acesso ao SISTEMA XYZ é feito somente pelo MT-LOGIN</p>
                                <p style="color: #495057;">Para acessar o SISTEMA XYZ da SEDEC ou se cadastrar para
                                    ter
                                    acesso, clique no botão abaixo.</p>
                            </div>
                            <div class="col-12 flex justify-content-center pt-3">
                                <Button @click="logar">
                                    <div>
                                        <i class="pi pi-sign-in mr-2"></i>
                                        <span>Acessar com </span><span><strong>MT-LOGIN</strong></span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </SimplePageWithBackground>
</template>

<style scoped></style>
