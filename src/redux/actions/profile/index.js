/**
 * Actions (disparadores)
 * 1era acción: cargando
 * 2do acción: si termino y tiene la data
 * 3ero acción: si hay un error
 */

// Valores actions: FETCH_FLIGHT_START, FETCH_FLIGHT_COMPLETE y FETCH_FLIGHT_ERROR serán evaluados en el reducer correspondiente (reducers/results.js)
export const FETCH_FLIGHT_START = 'FETCH_FLIGHT_START'
export const FETCH_FLIGHT_COMPLETE = 'FETCH_FLIGHT_COMPLETE'
export const FETCH_FLIGHT_ERROR = 'FETCH_FLIGHT_ERROR'

export const fetchFlightStart = () => ({
    type: FETCH_FLIGHT_START
})

export const fetchFlightComplete = (payload) => ({
    type: FETCH_FLIGHT_COMPLETE,
    payload // action.payload
})

export const fetchFlightError = (error) => ({
    type: FETCH_FLIGHT_ERROR,
    error
})
