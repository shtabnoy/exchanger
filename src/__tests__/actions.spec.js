/* global describe */
/* global it */
/* global expect */
/* global afterEach */
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
    it('should create an action to set isLoading flag', () => {
        const isLoading = true
        const expectedAction = {
            type: actions.EXCHANGE_LOADING,
            isLoading
        }
        expect(actions.exchangeIsLoading(isLoading)).toEqual(expectedAction)
    })
    it('should create an action to set exchange data when request is successfully finished', () => {
        const exchangeData = {
            base: 'USD',
            rates: {
                EUR: 0.8
            }
        }
        const expectedAction = {
            type: actions.EXCHANGE_SUCCESS,
            exchangeData
        }
        expect(actions.exchangeSuccess(exchangeData)).toEqual(expectedAction)
    })
    it('should create an action to set error when request is finished with error', () => {
        const error = 'Network Error'
        const expectedAction = {
            type: actions.EXCHANGE_ERROR,
            error
        }
        expect(actions.exchangeError(error)).toEqual(expectedAction)
    })
    it('should create an action to update target currency', () => {
        const currency = 'GBP'
        const expectedAction = {
            type: actions.UPDATE_TARGET_CURRENCY,
            currency
        }
        expect(actions.updateTargetCurrency(currency)).toEqual(expectedAction)
    })
    it('should create an action to update base value', () => {
        const value = 0.98
        const expectedAction = {
            type: actions.UPDATE_BASE_VALUE,
            value
        }
        expect(actions.updateBaseValue(value)).toEqual(expectedAction)
    })
})

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
    it('creates EXCHANGE_SUCCESS when getting exchange rates has been done', () => {
        const base = 'USD'
        const responseBody = {
            base,
            rates: {
                EUR: 0.81766,
                GBP: 0.72657
            }
        }
        const expectedActions = [
            { type: actions.EXCHANGE_LOADING, isLoading: true },
            { type: actions.EXCHANGE_LOADING, isLoading: false },
            { type: actions.EXCHANGE_SUCCESS, exchangeData: responseBody }
        ]
        const store = mockStore({
            exchangeData: {
                base: 'USD',
                rates: {}
            }
        })
        fetchMock.getOnce(`${actions.BASE_URL}/latest?base=${base}`, {
            body: responseBody,
            headers: { 'content-type': 'application/json' }
        })

        return store.dispatch(actions.getExchangeRates(base)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
