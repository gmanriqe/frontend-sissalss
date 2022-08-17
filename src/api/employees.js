import axios from 'axios'
import { URL_API} from '../config/index'

export const APIEditEmployee = (id, configHeader, callback) => {
    const url = `${URL_API}/edit_employee/${id}`
    axios
        .get(url, configHeader)
        .then(response => {
            callback(response)
        })
        .catch((error) => {
            if (error.response) {
                callback(error.response)
            }
        })

}