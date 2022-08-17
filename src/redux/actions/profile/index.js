/**
 * Actions (disparadores)
 * 1era acción: cargando
 * 2do acción: si termino y tiene la data
 * 3ero acción: si hay un error
 */

// Valores actions: FETCH_PASSWORD_START, FETCH_PASSWORD_COMPLETE y FETCH_PASSWORD_ERROR serán evaluados en el reducer correspondiente (reducers/results.js)
export const FETCH_PASSWORD_START = 'FETCH_PASSWORD_START'
export const FETCH_PASSWORD_COMPLETE = 'FETCH_PASSWORD_COMPLETE'
export const FETCH_PASSWORD_ERROR = 'FETCH_PASSWORD_ERROR'

export const fetchPasswordStart = () => ({
    type: FETCH_PASSWORD_START
})

export const fetchPasswordComplete = (payload) => ({
    type: FETCH_PASSWORD_COMPLETE,
    payload // action.payload
})

export const fetchPasswordError = (error) => ({
    type: FETCH_PASSWORD_ERROR,
    error
})
