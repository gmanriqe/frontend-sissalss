import axios from 'axios'
import { URL_API, CONFIG_HEADER } from '../config/index'

export const APIListTypeDocument = (formData, callback) => {
    const url = `${URL_API}/list_type_document`

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

export const fetchData = async (url, configHeader) => {
    // const url = `${URL_API}/list_type_document`
    return axios.get(url, configHeader)
}