import {
    EXCHANGE_LOADING,
    EXCHANGE_SUCCESS,
    EXCHANGE_ERROR
} from '../actions'

const getDefaultState = () => ({
    rates: {},
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
                rates: action.rates
            }
        case EXCHANGE_ERROR:
            return {
                ...state,
                isError: action.isError
            }
        default:
            return state
    }
}
