import {
    EXCHANGE_LOADING,
    EXCHANGE_SUCCESS,
    EXCHANGE_ERROR,
    SET_TARGET_CURRENCY
} from '../actions'

const getDefaultState = () => ({
    currencies: ['USD', 'EUR', 'GBP'],
    exchangeData: {
        base: 'USD',
        rates: {}
    },
    targetCurrency: 'EUR',
    isLoading: false,
    isError: false
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
                    state.targetCurrency
            }
        case EXCHANGE_ERROR:
            return {
                ...state,
                isError: action.isError
            }
        case SET_TARGET_CURRENCY:
            return {
                ...state,
                targetCurrency: action.currency
            }
        default:
            return state
    }
}
