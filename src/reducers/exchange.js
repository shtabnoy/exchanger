import {
    EXCHANGE_LOADING,
    EXCHANGE_SUCCESS,
    EXCHANGE_ERROR,
    UPDATE_TARGET_CURRENCY,
    UPDATE_BASE_VALUE
} from '../actions'

export const getDefaultState = () => ({
    currencies: ['USD', 'EUR', 'GBP'],
    exchangeData: {
        base: 'USD',
        rates: {}
    },
    baseValue: 0,
    targetCurrency: 'EUR',
    isLoading: false,
    error: ''
})

export default (state = getDefaultState(), action) => {
    switch (action.type) {
        case EXCHANGE_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case EXCHANGE_SUCCESS:
            return {
                ...state,
                exchangeData: action.exchangeData,
                targetCurrency: action.exchangeData.base === state.targetCurrency ?
                    state.currencies.filter(currency => currency !== action.exchangeData.base)[0] :
                    state.targetCurrency,
                error: ''
            }
        case EXCHANGE_ERROR:
            return {
                ...state,
                error: action.error
            }
        case UPDATE_TARGET_CURRENCY:
            return {
                ...state,
                targetCurrency: action.currency
            }
        case UPDATE_BASE_VALUE:
            return {
                ...state,
                baseValue: action.value
            }
        default:
            return state
    }
}
