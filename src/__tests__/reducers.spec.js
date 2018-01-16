/* global describe */
/* global it */
/* global expect */
import reducer, { getDefaultState } from '../reducers/exchange'
import {
    EXCHANGE_LOADING,
    EXCHANGE_SUCCESS,
    EXCHANGE_ERROR,
    UPDATE_TARGET_CURRENCY,
    UPDATE_BASE_VALUE
} from '../actions'

describe('exchange reducer', () => {
    const defaultState = getDefaultState()

    it('should return the default state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState)
    })
    it('should handle EXCHANGE_LOADING', () => {
        expect(reducer(defaultState, {
            type: EXCHANGE_LOADING,
            isLoading: true
        })).toEqual({
            currencies: ['USD', 'EUR', 'GBP'],
            exchangeData: {
                base: 'USD',
                rates: {}
            },
            baseValue: 0,
            targetCurrency: 'EUR',
            isLoading: true,
            error: ''
        })
    })
    it('should handle EXCHANGE_SUCCESS', () => {
        expect(reducer(defaultState, {
            type: EXCHANGE_SUCCESS,
            exchangeData: {
                base: 'USD',
                rates: {
                    EUR: 0.8
                }
            }
        })).toEqual({
            currencies: ['USD', 'EUR', 'GBP'],
            exchangeData: {
                base: 'USD',
                rates: {
                    EUR: 0.8
                }
            },
            baseValue: 0,
            targetCurrency: 'EUR',
            isLoading: false,
            error: ''
        })
    })
    it('should handle EXCHANGE_ERROR', () => {
        expect(reducer(defaultState, {
            type: EXCHANGE_ERROR,
            error: 'Network Error'
        })).toEqual({
            currencies: ['USD', 'EUR', 'GBP'],
            exchangeData: {
                base: 'USD',
                rates: {}
            },
            baseValue: 0,
            targetCurrency: 'EUR',
            isLoading: false,
            error: 'Network Error'
        })
    })
    it('should handle UPDATE_TARGET_CURRENCY', () => {
        expect(reducer(defaultState, {
            type: UPDATE_TARGET_CURRENCY,
            currency: 'GBP'
        })).toEqual({
            currencies: ['USD', 'EUR', 'GBP'],
            exchangeData: {
                base: 'USD',
                rates: {}
            },
            baseValue: 0,
            targetCurrency: 'GBP',
            isLoading: false,
            error: ''
        })
    })
    it('should handle UPDATE_BASE_VALUE', () => {
        expect(reducer(defaultState, {
            type: UPDATE_BASE_VALUE,
            value: 11.784
        })).toEqual({
            currencies: ['USD', 'EUR', 'GBP'],
            exchangeData: {
                base: 'USD',
                rates: {}
            },
            baseValue: 11.784,
            targetCurrency: 'EUR',
            isLoading: false,
            error: ''
        })
    })
})
