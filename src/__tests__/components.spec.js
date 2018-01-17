/* global describe */
/* global it */
/* global expect */
/* global jest */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RateBlock from '../components/RateBlock'
import InfoBlock from '../components/InfoBlock'
import ErrorBlock from '../components/ErrorBlock'
import BaseBlock from '../components/BaseBlock'
import TargetBlock from '../components/TargetBlock'

Enzyme.configure({ adapter: new Adapter() })

describe('components', () => {
    describe('RateBlock', () => {
        const props = {
            baseCurrency: 'USD',
            targetCurrency: 'EUR',
            rate: 0.8,
            className: 'currency-block'
        }
        const enzymeWrapper = mount(<RateBlock {...props} />)

        it('should render self', () => {
            const baseCurrencyProp = enzymeWrapper.props().baseCurrency
            const targetCurrencyProp = enzymeWrapper.props().targetCurrency
            const rateProp = enzymeWrapper.props().rate
            const classNameProp = enzymeWrapper.props().className

            expect(enzymeWrapper.find('div').hasClass('currency-block')).toBe(true)
            expect(baseCurrencyProp).toEqual('USD')
            expect(targetCurrencyProp).toEqual('EUR')
            expect(rateProp).toEqual(0.8)
            expect(classNameProp).toEqual('currency-block')
            expect(enzymeWrapper.find('div').text()).toEqual(`1 ${baseCurrencyProp} = ${rateProp} ${targetCurrencyProp}`)
        })
    })
    describe('InfoBlock', () => {
        const props = {
            startPolling: jest.fn(),
            stopPolling: jest.fn(),
            className: 'block'
        }
        const enzymeWrapper = mount(<InfoBlock {...props} />)

        it('should render self', () => {
            expect(enzymeWrapper.find('div').hasClass('block')).toBe(true)
        })
        it('should call startPolling when first button is clicked', () => {
            enzymeWrapper.find('button').at(0).simulate('click')
            expect(enzymeWrapper.props().startPolling.mock.calls.length).toBe(1)
        })
        it('should call stopPolling when second button is clicked', () => {
            enzymeWrapper.find('button').at(1).simulate('click')
            expect(enzymeWrapper.props().stopPolling.mock.calls.length).toBe(1)
        })
    })
    describe('ErrorBlock', () => {
        it('should render self if error is not empty', () => {
            const props = {
                error: 'Network Error',
                className: 'error-block'
            }
            const enzymeWrapper = mount(<ErrorBlock {...props} />)
            expect(enzymeWrapper.find('div').length).toBe(1)
            expect(enzymeWrapper.find('div').hasClass('error-block')).toBe(true)
            expect(enzymeWrapper.find('div').text()).toEqual(enzymeWrapper.props().error)
        })
        it('should not render self if error is empty', () => {
            const props = {
                error: '',
                className: 'error-block'
            }
            const enzymeWrapper = mount(<ErrorBlock {...props} />)
            expect(enzymeWrapper.find('div').length).toBe(0)
        })
    })
    describe('BaseBlock', () => {
        const props = {
            baseCurrency: 'USD',
            baseValue: 10000,
            getBase: jest.fn(),
            updateBaseValue: jest.fn(),
            disabled: false,
            className: 'currency-block'
        }
        let enzymeWrapper = mount(<BaseBlock {...props} />)

        it('should render self', () => {
            expect(enzymeWrapper.find('div').hasClass('currency-block')).toBe(true)
            expect(enzymeWrapper.props().baseCurrency).toEqual('USD')
            expect(enzymeWrapper.props().baseValue).toEqual(10000)
            expect(enzymeWrapper.props().disabled).toEqual(false)
            expect(enzymeWrapper.props().className).toEqual('currency-block')
        })
        it('should render base currency with space at the end in the span', () => {
            expect(enzymeWrapper.find('span').text()).toEqual(`${enzymeWrapper.props().baseCurrency} `)
        })
        it('should call getBase on clicks of buttons', () => {
            enzymeWrapper.find('button').at(0).simulate('click')
            expect(enzymeWrapper.props().getBase.mock.calls.length).toBe(1)
            expect(enzymeWrapper.props().getBase.mock.calls[0][0]).toEqual('previous')
            enzymeWrapper.find('button').at(1).simulate('click')
            expect(enzymeWrapper.props().getBase.mock.calls.length).toBe(2)
            expect(enzymeWrapper.props().getBase.mock.calls[1][0]).toEqual('next')
        })
        it('should place base value into input value', () => {
            expect(enzymeWrapper.find('input').props().value).toBe(10000)
        })
        it('should call updateBaseValue on input change', () => {
            enzymeWrapper.find('input').simulate('change', { target: { value: 10000.01 } })
            expect(enzymeWrapper.props().updateBaseValue.mock.calls.length).toBe(1)
            expect(enzymeWrapper.props().updateBaseValue.mock.calls[0][0]).toBe(10000.01)
        })
        it('should disable buttons is disabled prop is true', () => {
            props.disabled = true
            enzymeWrapper = mount(<BaseBlock {...props} />)
            expect(enzymeWrapper.find('button').at(0).props().disabled).toBe(true)
            expect(enzymeWrapper.find('button').at(1).props().disabled).toBe(true)
        })
    })
    describe('TargetBlock', () => {
        const props = {
            targetCurrency: 'EUR',
            baseValue: 10000,
            rate: 0.8,
            getTarget: jest.fn(),
            disabled: false,
            className: 'currency-block'
        }
        let enzymeWrapper = mount(<TargetBlock {...props} />)

        it('should render self', () => {
            expect(enzymeWrapper.find('div').hasClass('currency-block')).toBe(true)
            expect(enzymeWrapper.props().targetCurrency).toEqual('EUR')
            expect(enzymeWrapper.props().baseValue).toEqual(10000)
            expect(enzymeWrapper.props().rate).toEqual(0.8)
            expect(enzymeWrapper.props().disabled).toEqual(false)
            expect(enzymeWrapper.props().className).toEqual('currency-block')
        })
        it('should render target currency and its value in the span according to rate', () => {
            const targetCurrencyProp = enzymeWrapper.props().targetCurrency
            const rateProp = enzymeWrapper.props().rate
            const baseValueProp = enzymeWrapper.props().baseValue
            expect(enzymeWrapper.find('span').text()).toEqual(
                `${targetCurrencyProp} ${(rateProp * baseValueProp).toFixed(2)}`
            )
        })
        it('should call getTarget on clicks on buttons', () => {
            enzymeWrapper.find('button').at(0).simulate('click')
            expect(enzymeWrapper.props().getTarget.mock.calls.length).toBe(1)
            expect(enzymeWrapper.props().getTarget.mock.calls[0][0]).toEqual('previous')
            enzymeWrapper.find('button').at(1).simulate('click')
            expect(enzymeWrapper.props().getTarget.mock.calls.length).toBe(2)
            expect(enzymeWrapper.props().getTarget.mock.calls[1][0]).toEqual('next')
        })
        it('should disable buttons is disabled prop is true', () => {
            props.disabled = true
            enzymeWrapper = mount(<TargetBlock {...props} />)
            expect(enzymeWrapper.find('button').at(0).props().disabled).toBe(true)
            expect(enzymeWrapper.find('button').at(1).props().disabled).toBe(true)
        })
    })
})
