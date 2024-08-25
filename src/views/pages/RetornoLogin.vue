<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import axios from 'axios'
import axiosInstance from '../../axios-base-url'
import jwt_decode from 'jwt-decode'
import { tokenStorage, refreshTokenStorage, userStorage } from '../../constants/BrowserStorageVars'
import SimplePageWithBackground from '@/components/SimplePageWithBackground.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const url_token = import.meta.env.VITE_APP_URL_TOKEN
const grant_type = import.meta.env.VITE_APP_GRANT_TYPE_AUTHORIZATION_CODE
const client_id = import.meta.env.VITE_APP_CLIENT_ID
const redirect_uri = import.meta.env.VITE_APP_REDIRECT_URI

onMounted(async () => {

    await axios.post(url_token, new URLSearchParams({
        'grant_type': grant_type,
        'client_id': client_id,
        'code': route.query.code,
        'redirect_uri': redirect_uri
    }), {
        'Content-Type': 'application/x-www-form-urlencoded'
    }).then(response => {
        //salvar token no localstorage
        localStorage.setItem(tokenStorage, response.data.access_token)
        localStorage.setItem(refreshTokenStorage, response.data.refresh_token)

        var decoded = jwt_decode(response.data.access_token);

        store.commit('userModule/setToken', response.data.access_token)
        store.commit('userModule/setRefreshToken', response.data.refresh_token)
        store.commit('userModule/setExpires', decoded.exp)

    }).catch(async (error) => {
        console.log('ERRO AO TENTAR EFETUAR O LOGIN USANDO O CODE RETORNADO:', error)
        store.commit('userModule/setAuthErrorMessage', 'Erro ao tentar efetuar o login usando o code retornado')
        await store.dispatch('userModule/logout')
    })

    //recuperar informações do usuario logado
    await axiosInstance().get("/user", {
        headers: {
            'Authorization': 'Bearer ' + store.state.userModule.token,
            'Content-Type': 'application/json',
        }
    }).then(async (response) => {
        //salvar informações do usuario logado no localstorage e no store
        await store.dispatch('userModule/efetuarLogin', response.data)
    }).catch(async (error) => {
        console.log('ERRO AO TENTAR BUSCAR DADOS DO USUARIO NA API:', error)
        debugger
        store.commit('userModule/setAuthErrorMessage', 'Erro ao tentar buscar dados do usuário na API')
        await store.dispatch('userModule/logout')
    })
})
</script>
<template>
    <SimplePageWithBackground :botaoDeRetornoAtivo="false">
        <div class="grid m-0 w-full">
            <div class="col-12 flex justify-content-center align-items-center"
                 style="min-height: 250px; min-width: 250px;">
                <ProgressSpinner />
            </div>
        </div>

    </SimplePageWithBackground>

</template>
<style scoped></style>