/* global fetch */
const BASE_URL = 'https://api.fixer.io'

export const EXCHANGE_LOADING = 'EXCHANGE_LOADING'
export const EXCHANGE_SUCCESS = 'EXCHANGE_SUCCESS'
export const EXCHANGE_ERROR = 'EXCHANGE_ERROR'

export const exchangeIsLoading = bool => ({
    type: 'EXCHANGE_LOADING',
    isLoading: bool
})

export const exchangeSuccess = rates => ({
    type: 'EXCHANGE_SUCCESS',
    rates
})

export const exchangeError = bool => ({
    type: 'EXCHANGE_ERROR',
    isError: bool
})

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
        .then(response => dispatch(exchangeSuccess(response.rates)))
        .catch(() => dispatch(exchangeError(true)))
}

