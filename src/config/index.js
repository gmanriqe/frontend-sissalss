/* Variables de configuración */
const url = 'http://localhost:8000'

export const URL_API = `${url}/api/v1`
export const CONFIG_HEADER = {
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
    },
}