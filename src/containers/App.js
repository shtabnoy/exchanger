import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    getExchangeRates,
    updateTargetCurrency,
    updateBaseValue,
    stopPolling
} from '../actions'
import RateBlock from '../components/RateBlock'
import BaseBlock from '../components/BaseBlock'
import TargetBlock from '../components/TargetBlock'
import './App.scss'

class App extends Component {
    static propTypes = {
        getExchangeRates: PropTypes.func.isRequired,
        updateTargetCurrency: PropTypes.func.isRequired,
        updateBaseValue: PropTypes.func.isRequired,
        stopPolling: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        // isError: PropTypes.bool.isRequired,
        baseCurrency: PropTypes.string.isRequired,
        baseValue: PropTypes.number.isRequired,
        rates: PropTypes.shape({
            [PropTypes.string]: PropTypes.number
        }).isRequired,
        currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
        targetCurrency: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.getExchangeRates(this.props.baseCurrency)
    }

    getBase = (direction) => {
        const { currencies, baseCurrency, getExchangeRates } = this.props
        const len = currencies.length
        let index = currencies.indexOf(baseCurrency)
        if (direction === 'next') index++
        if (direction === 'previous') index--
        getExchangeRates(currencies[((index % len) + len) % len])
    }

    getTarget = (direction) => {
        const { currencies, targetCurrency, baseCurrency, updateTargetCurrency } = this.props
        const filteredCurrencies = currencies.filter(currency => currency !== baseCurrency)
        const len = filteredCurrencies.length
        let index = filteredCurrencies.indexOf(targetCurrency)
        if (direction === 'next') index++
        if (direction === 'previous') index--
        updateTargetCurrency(filteredCurrencies[((index % len) + len) % len])
    }

    // TODO: Add error displaying
    render() {
        const {
            baseCurrency,
            baseValue,
            targetCurrency,
            rates,
            isLoading
        } = this.props
        return (
            <div>
                <RateBlock
                    baseCurrency={baseCurrency}
                    targetCurrency={targetCurrency}
                    rate={rates[targetCurrency]}
                />
                <BaseBlock
                    disabled={isLoading}
                    baseCurrency={baseCurrency}
                    baseValue={baseValue}
                    updateBaseValue={this.props.updateBaseValue}
                    getBase={this.getBase}
                />
                <TargetBlock
                    disabled={isLoading}
                    baseValue={baseValue}
                    targetCurrency={targetCurrency}
                    rate={rates[targetCurrency]}
                    getTarget={this.getTarget}
                />
                <button onClick={this.props.stopPolling}>
                    Stop
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currencies: state.Exchange.currencies,
    targetCurrency: state.Exchange.targetCurrency,
    baseCurrency: state.Exchange.exchangeData.base,
    baseValue: state.Exchange.baseValue,
    rates: state.Exchange.exchangeData.rates,
    isLoading: state.Exchange.isLoading,
    isError: state.Exchange.isError
})

const mapDispatchToProps = (dispatch) => ({
    getExchangeRates: (base) => dispatch(getExchangeRates(base)),
    updateTargetCurrency: (currency) => dispatch(updateTargetCurrency(currency)),
    updateBaseValue: (value) => dispatch(updateBaseValue(value)),
    stopPolling: () => dispatch(stopPolling)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
