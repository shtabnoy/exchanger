/* global fetch */
import 'whatwg-fetch'

const BASE_URL = 'https://api.fixer.io'

export const EXCHANGE_LOADING = 'EXCHANGE_LOADING'
export const EXCHANGE_SUCCESS = 'EXCHANGE_SUCCESS'
export const EXCHANGE_ERROR = 'EXCHANGE_ERROR'
export const SET_TARGET_CURRENCY = 'SET_TARGET_CURRENCY'

const TIMEOUT = 10000
let timer

export const exchangeIsLoading = bool => ({
    type: 'EXCHANGE_LOADING',
    isLoading: bool
})

export const exchangeSuccess = exchangeData => ({
    type: 'EXCHANGE_SUCCESS',
    exchangeData
})

export const exchangeError = bool => ({
    type: 'EXCHANGE_ERROR',
    isError: bool
})

export const setTargetCurrency = currency => ({
    type: 'SET_TARGET_CURRENCY',
    currency
})

export const stopPolling = () => {
    clearTimeout(timer)
}

export const getExchangeRates = base => (dispatch) => {
    dispatch(exchangeIsLoading(true))
    fetch(`${BASE_URL}/latest?base=${base}`)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            dispatch(exchangeIsLoading(false))
            return response
        })
        .then(response => response.json())
        .then(response => dispatch(exchangeSuccess(response)))
        .then(() => {
            clearTimeout(timer)
            timer = setTimeout(() => dispatch(getExchangeRates(base)), TIMEOUT)
        })
        .catch(() => dispatch(exchangeError(true)))
}
