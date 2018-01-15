/* global fetch */
import 'whatwg-fetch'

const BASE_URL = 'https://api.fixer.io'

export const EXCHANGE_LOADING = 'EXCHANGE_LOADING'
export const EXCHANGE_SUCCESS = 'EXCHANGE_SUCCESS'
export const EXCHANGE_ERROR = 'EXCHANGE_ERROR'
export const UPDATE_TARGET_CURRENCY = 'UPDATE_TARGET_CURRENCY'
export const UPDATE_BASE_VALUE = 'UPDATE_BASE_VALUE'

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

export const exchangeError = error => ({
    type: 'EXCHANGE_ERROR',
    error
})

export const updateTargetCurrency = currency => ({
    type: 'UPDATE_TARGET_CURRENCY',
    currency
})

export const updateBaseValue = value => ({
    type: 'UPDATE_BASE_VALUE',
    value
})

export const stopPolling = () => {
    clearTimeout(timer)
}

export const getExchangeRates = base => (dispatch) => {
    dispatch(exchangeIsLoading(true))
    fetch(`${BASE_URL}/latest?base=${base}`)
        .then((response) => {
            dispatch(exchangeIsLoading(false))
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then(response => response.json())
        .then(response => dispatch(exchangeSuccess(response)))
        .then(() => {
            clearTimeout(timer)
            timer = setTimeout(() => dispatch(getExchangeRates(base)), TIMEOUT)
        })
        .catch((err) => dispatch(exchangeError(`Error: ${err.message}`)))
}
