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
        'value': ''
    },
    {
        'label': 'FEMENINO',
        'value': '0'
    },
    {
        'label': 'MASCULINO',
        'value': '1'
    },
]