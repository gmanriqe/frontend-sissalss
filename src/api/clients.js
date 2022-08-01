import axios from 'axios'
import { URL_API, CONFIG_HEADER as headerConfig } from '../config/index'

export const APIListClient = (CONFIG_HEADER = headerConfig, callback) => {
    const url = `${URL_API}/list_clientes`
    axios
        .get(url, CONFIG_HEADER)
        .then(response => {
            console.log(response)
            callback(response)
        })
        .catch((error) => {
            if (error.response) {
                callback(error.response)
            }
        })
}