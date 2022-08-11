import axios from 'axios'
import { URL_API, CONFIG_HEADER } from '../config/index'

export const APIPermissionsMenu = (formData, callback) => {
    const url = `${URL_API}/permissions_menu`
    axios
        .post(url, formData, CONFIG_HEADER)
        .then(response => {
            callback(response)
        })
        .catch((error) => {
            if (error.response) {
                callback(error.response)
            }
        })

}