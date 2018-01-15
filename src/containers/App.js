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
        // isLoading: PropTypes.bool.isRequired,
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

    // TODO: Refactor next and previous
    getNextBase = () => {
        const { currencies, baseCurrency } = this.props
        const len = currencies.length
        const nextCurrencyIndex = currencies.indexOf(baseCurrency) + 1
        this.props.getExchangeRates(currencies[((nextCurrencyIndex % len) + len) % len])
    }

    // TODO: Refactor next and previous
    getPreviousBase = () => {
        const { currencies, baseCurrency } = this.props
        const len = currencies.length
        const previousCurrencyIndex = currencies.indexOf(baseCurrency) - 1
        this.props.getExchangeRates(currencies[((previousCurrencyIndex % len) + len) % len])
    }

    // TODO: Refactor nextTargetCurrency and previousTargetCurrency
    getNextTarget = () => {
        const filteredCurrencies =
            this.props.currencies.filter(currency => currency !== this.props.baseCurrency)
        const len = filteredCurrencies.length
        const index = filteredCurrencies.indexOf(this.props.targetCurrency) + 1
        const targetCurrency = filteredCurrencies[((index % len) + len) % len]
        this.props.updateTargetCurrency(targetCurrency)
    }

    // TODO: Refactor nextTargetCurrency and previousTargetCurrency
    getPreviousTarget = () => {
        const filteredCurrencies =
            this.props.currencies.filter(currency => currency !== this.props.baseCurrency)
        const len = filteredCurrencies.length
        const index = filteredCurrencies.indexOf(this.props.targetCurrency) - 1
        const targetCurrency = filteredCurrencies[((index % len) + len) % len]
        this.props.updateTargetCurrency(targetCurrency)
    }

    // TODO: Disable buttons until request is finished
    // TODO: Add error displaying
    render() {
        const {
            baseCurrency,
            baseValue,
            targetCurrency,
            rates
        } = this.props

        return (
            <div>
                <RateBlock
                    baseCurrency={baseCurrency}
                    targetCurrency={targetCurrency}
                    rate={rates[targetCurrency]}
                />
                <BaseBlock
                    baseCurrency={baseCurrency}
                    baseValue={baseValue}
                    updateBaseValue={this.props.updateBaseValue}
                    getPreviousBase={this.getPreviousBase}
                    getNextBase={this.getNextBase}
                />
                <TargetBlock
                    baseValue={baseValue}
                    targetCurrency={targetCurrency}
                    rate={rates[targetCurrency]}
                    getPreviousTarget={this.getPreviousTarget}
                    getNextTarget={this.getNextTarget}
                />
                <button onClick={this.props.stopPolling}>
                    Stop polling
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

const mapDispatchToProps = {
    getExchangeRates,
    updateTargetCurrency,
    updateBaseValue,
    stopPolling
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
