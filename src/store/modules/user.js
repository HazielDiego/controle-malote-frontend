
import { tokenStorage, refreshTokenStorage, userStorage } from "@/constants/BrowserStorageVars"
import jwt_decode from "jwt-decode";
import router from "../../router";
import axiosInstance from '../../axios-base-url';
import moment from 'moment';
import axios from "axios";

const url_token = import.meta.env.VITE_APP_URL_TOKEN
const grant_type_refresh_token = import.meta.env.VITE_APP_GRANT_TYPE_REFRESH_TOKEN
const client_id = import.meta.env.VITE_APP_CLIENT_ID

const moduloUsers = {
    namespaced: true,
    state: {
        token: null,
        refreshToken: null,
        user: null,
        expires: 0,
        authErrorMessage: null
    },
    mutations: {
        setToken: (state, token) => state.token = token,
        setRefreshToken: (state, refreshToken) => state.refreshToken = refreshToken,
        setUser: (state, user) => state.user = user,
        setExpires: (state, expires) => state.expires = expires,
        setAuthErrorMessage: (state, authErrorMessage) => state.authErrorMessage = authErrorMessage,

    },
    actions: {
        efetuarLogin: async ({ commit, dispatch }, user) => {
            localStorage.setItem(userStorage, JSON.stringify(user));

            await commit('setToken', localStorage.getItem(tokenStorage));
            await commit('setRefreshToken', localStorage.getItem(refreshTokenStorage));
            await commit('setUser', user);
            await commit('setExpires', jwt_decode(localStorage.getItem(tokenStorage)).exp);
            await commit('setAuthErrorMessage', null);
            router.push({ name: 'dashboard' });

        },
        recoverUser: async ({ commit }) => {
            await axiosInstance().get("/user").then(async (response) => {
                await commit('setUser', response.data);
            }).catch(error => {
                console.log(error);
                commit('setErrorMessage', "OCORREU UM ERRO AO TENTAR BUSCAR INFORMAÇÕES DO USUÁRIO");
            });
        },
        isAuthenticated: async ({ state, commit, dispatch }) => {
            const local = localStorage.getItem(tokenStorage)
            const session = sessionStorage.getItem(tokenStorage)
            const tokenJWT = local || session

            const localRefresh = localStorage.getItem(refreshTokenStorage)
            const sessionRefresh = sessionStorage.getItem(refreshTokenStorage)
            const tokenJWTRefresh = localRefresh || sessionRefresh

            const isAuth = !!tokenJWT

            if (tokenJWT) {
                var decoded = jwt_decode(tokenJWT);
                //VERIFICA SE O TOKEN JÁ EXPIROU
                const exp = decoded.exp * 1000
                if (moment(exp).isBefore()) {

                    await commit('setToken', null);
                    await commit('setRefreshToken', null);
                    await commit('setUser', null);
                    await commit('setExpires', 0);
                    await commit('setAuthErrorMessage', null);
                    localStorage.removeItem(tokenStorage);
                    localStorage.removeItem(refreshTokenStorage);
                    localStorage.removeItem(userStorage);
                    return false;
                }
            }

            if (isAuth && (state.token === null || state.token == '')) {

                //busca dados da pessoa
                await dispatch('recoverUser');
                await commit('setToken', tokenJWT);
                await commit('setRefreshToken', tokenJWTRefresh);
                await commit('setUser', state.user);
                await commit('setExpires', decoded.exp);
            }
            return isAuth
        },
        logout: async ({ commit }) => {
            await commit('setToken', null);
            await commit('setRefreshToken', null);
            await commit('setUser', null);
            await commit('setExpires', 0);
            await commit('setAuthErrorMessage', null);
            localStorage.removeItem(tokenStorage);
            localStorage.removeItem(refreshTokenStorage);
            localStorage.removeItem(userStorage);
            const url_logout = import.meta.env.VITE_APP_LOGOUT;
            window.location.href = url_logout;
        },
        refreshToken: async ({ state, commit, dispatch }) => {
            await axios.post(url_token, new URLSearchParams({
                'grant_type': grant_type_refresh_token,
                'client_id': client_id,
                'refresh_token': state.refreshToken
            }), {
                'Content-Type': 'application/x-www-form-urlencoded'
            }).then(response => {
                localStorage.setItem(tokenStorage, response.data.access_token);
                localStorage.setItem(refreshTokenStorage, response.data.refresh_token);
                var decoded = jwt_decode(response.data.access_token);
                commit('setToken', response.data.access_token);
                commit('setRefreshToken', response.data.refresh_token);
                commit('setExpires', decoded.exp);
            }).catch(error => {
                console.log(error);
                if (error.response.status == 400) {
                    dispatch('logout')
                }
            });
        }
    },
    getters: {
        getToken: state => state.token,
        getRefreshToken: state => state.refreshToken,
        getUser: state => state.user,
        getExpires: state => state.expires,
        getAuthErrorMessage: state => state.authErrorMessage,
    },
};

export default moduloUsers;