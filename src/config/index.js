import axios from 'axios'

/* Variables de configuración */
const url = 'http://localhost:8000'

// export const URL_API = `${url}/api/v1`
export const URL_API = `${url}/v1/auth`
export const CONFIG_HEADER = {
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
    },
}
export const ROLE = {
    ADMIN: 'ADMIN',
    CASHIER: 'CASHIER'
}
export const SEX = [
    {
        'label': 'SELECCIONE..',
        'value': '0'
    },
    {
        'label': 'FEMENINO',
        'value': '1'
    },
    {
        'label': 'MASCULINO',
        'value': '2'
    },
]

export const fetchGetData = async (url) => {
    return axios.get(url)
}

export const fetchPostData = async (url, payload) => {
    return axios.post(url, payload)
}