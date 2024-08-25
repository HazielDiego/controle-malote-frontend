import axios from 'axios'
import * as sysConsts from '@/constants/sysConsts'
import { tokenStorage } from './constants/BrowserStorageVars'

const axiosInstance = () => {
  const local = localStorage.getItem(tokenStorage)
  const session = sessionStorage.getItem(tokenStorage)
  const tokenJWT = local || session
  return axios.create({
    baseURL: sysConsts.backendBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenJWT,
    },
  })
}

export const axiosNoAuthInstance = () => {
  return axios.create({
    baseURL: sysConsts.backendBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default axiosInstance
