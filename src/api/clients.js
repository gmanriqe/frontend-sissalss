import axios from 'axios'
import { URL_API, CONFIG_HEADER as headerConfig } from '../config/index'

export const APIListClient = (CONFIG_HEADER = headerConfig, callback) => {
    const url = `${URL_API}/list_clients`
    axios
        .get(url, CONFIG_HEADER)
        .then(response => {
            callback(response)
        })
        .catch((error) => {
            if (error.response) {
                callback(error.response)
            }
        })
}