import axios from 'axios'
import { URL_API, CONFIG_HEADER as headerConfig } from '../config/index'

export const APIListTypeDocument = (CONFIG_HEADER = headerConfig, callback) => {
    const url = `${URL_API}/list_documento_identidad`
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