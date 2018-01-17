/* global describe */
/* global it */
/* global expect */
/* global jest */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App } from '../containers/App'

Enzyme.configure({ adapter: new Adapter() })

describe('containers', () => {
    describe('App', () => {
        const props = {
            currencies: ['USD', 'EUR', 'GBP'],
            baseCurrency: 'USD',
            baseValue: 100,
            targetCurrency: 'EUR',
            rates: {
                EUR: 0.8
            },
            isLoading: false,
            error: '',
            getExchangeRates: jest.fn(),
            updateTargetCurrency: jest.fn(),
            updateBaseValue: jest.fn(),
            stopPolling: jest.fn()
        }
        const enzymeWrapper = mount(<App {...props} />)
        const baseCurrencyProp = enzymeWrapper.props().baseCurrency
        const baseValueProp = enzymeWrapper.props().baseValue
        const targetCurrencyProp = enzymeWrapper.props().targetCurrency
        const ratesProp = enzymeWrapper.props().rates
        const isLoadingProp = enzymeWrapper.props().isLoading
        const errorProp = enzymeWrapper.props().error
        const updateBaseValueProp = enzymeWrapper.props().updateBaseValue

        it('should render self', () => {
            expect(enzymeWrapper.find('#app-container').length).toBe(1)
        })
        it('should ErrorBlock', () => {
            expect(enzymeWrapper.find('ErrorBlock').length).toBe(1)
            expect(enzymeWrapper.find('ErrorBlock').props().error).toEqual(errorProp)
            expect(enzymeWrapper.find('ErrorBlock').props().className).toEqual('block error-block')
        })
        it('should RateBlock', () => {
            expect(enzymeWrapper.find('RateBlock').length).toBe(1)
            expect(enzymeWrapper.find('RateBlock').props().className).toEqual('block currency-block')
            expect(enzymeWrapper.find('RateBlock').props().baseCurrency).toEqual(baseCurrencyProp)
            expect(enzymeWrapper.find('RateBlock').props().targetCurrency).toEqual(targetCurrencyProp)
            expect(enzymeWrapper.find('RateBlock').props().rate).toEqual(ratesProp[targetCurrencyProp])
        })
        it('should BaseBlock', () => {
            expect(enzymeWrapper.find('BaseBlock').length).toBe(1)
            expect(enzymeWrapper.find('BaseBlock').props().className).toEqual('block currency-block')
            expect(enzymeWrapper.find('BaseBlock').props().disabled).toEqual(isLoadingProp)
            expect(enzymeWrapper.find('BaseBlock').props().baseCurrency).toEqual(baseCurrencyProp)
            expect(enzymeWrapper.find('BaseBlock').props().baseValue).toEqual(baseValueProp)
            expect(enzymeWrapper.find('BaseBlock').props().updateBaseValue).toEqual(updateBaseValueProp)
        })
        it('should TargetBlock', () => {
            expect(enzymeWrapper.find('TargetBlock').length).toBe(1)
            expect(enzymeWrapper.find('TargetBlock').props().className).toEqual('block currency-block')
            expect(enzymeWrapper.find('TargetBlock').props().disabled).toEqual(isLoadingProp)
            expect(enzymeWrapper.find('TargetBlock').props().baseValue).toEqual(baseValueProp)
            expect(enzymeWrapper.find('TargetBlock').props().targetCurrency).toEqual(targetCurrencyProp)
            expect(enzymeWrapper.find('TargetBlock').props().rate).toEqual(ratesProp[targetCurrencyProp])
        })
    })
})
