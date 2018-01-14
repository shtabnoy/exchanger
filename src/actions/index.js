/* global fetch */
const BASE_URL = 'https://api.fixer.io'

export const EXCHANGE_LOADING = 'EXCHANGE_LOADING'
export const EXCHANGE_SUCCESS = 'EXCHANGE_SUCCESS'
export const EXCHANGE_ERROR = 'EXCHANGE_ERROR'
export const SET_TARGET_CURRENCY = 'SET_TARGET_CURRENCY'
export const RESET_TARGET_CURRENCY = 'RESET_TARGET_CURRENCY'
export const SET_TARGET_AMOUNT = 'SET_TARGET_AMOUNT'

export const exchangeIsLoading = bool => ({
    type: 'EXCHANGE_LOADING',
    isLoading: bool
})

export const exchangeSuccess = info => ({
    type: 'EXCHANGE_SUCCESS',
    info
})

export const exchangeError = bool => ({
    type: 'EXCHANGE_ERROR',
    isError: bool
})

export const setTargetCurrency = currency => ({
    type: 'SET_TARGET_CURRENCY',
    currency
})

export const setTargetAmount = amount => ({
    type: 'SET_TARGET_AMOUNT',
    amount
})

export const updateTarget = (targetCurrency, amountFrom, rate) => (dispatch) => {
    dispatch(setTargetCurrency(targetCurrency))
    dispatch(setTargetAmount((rate * amountFrom).toFixed(2)))
}

export const resetTargetCurrency = currency => ({
    type: 'RESET_TARGET_CURRENCY',
    currency
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
        .then(response => dispatch(exchangeSuccess(response)))
        .then(() => dispatch(resetTargetCurrency()))
        .catch(() => dispatch(exchangeError(true)))
}
