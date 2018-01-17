import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RateBlock from '../components/RateBlock'
import BaseBlock from '../components/BaseBlock'
import TargetBlock from '../components/TargetBlock'
import ErrorBlock from '../components/ErrorBlock'
import InfoBlock from '../components/InfoBlock'
import {
    getExchangeRates,
    updateTargetCurrency,
    updateBaseValue,
    stopPolling
} from '../actions'
import './App.scss'

export class App extends Component {
    static propTypes = {
        getExchangeRates: PropTypes.func.isRequired,
        updateTargetCurrency: PropTypes.func.isRequired,
        updateBaseValue: PropTypes.func.isRequired,
        stopPolling: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        baseCurrency: PropTypes.string.isRequired,
        baseValue: PropTypes.number.isRequired,
        rates: PropTypes.shape({
            [PropTypes.string]: PropTypes.number
        }).isRequired,
        currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
        targetCurrency: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.startPolling()
    }

    getBase = (direction) => {
        const { currencies, baseCurrency } = this.props
        const len = currencies.length
        let index = currencies.indexOf(baseCurrency)
        if (direction === 'next') index++
        if (direction === 'previous') index--
        this.props.getExchangeRates(currencies[((index % len) + len) % len])
    }

    getTarget = (direction) => {
        const { currencies, targetCurrency, baseCurrency } = this.props
        const filteredCurrencies = currencies.filter(currency => currency !== baseCurrency)
        const len = filteredCurrencies.length
        let index = filteredCurrencies.indexOf(targetCurrency)
        if (direction === 'next') index++
        if (direction === 'previous') index--
        this.props.updateTargetCurrency(filteredCurrencies[((index % len) + len) % len])
    }

    startPolling = () => this.props.getExchangeRates(this.props.baseCurrency)

    render() {
        const {
            baseCurrency,
            baseValue,
            targetCurrency,
            rates,
            isLoading,
            error
        } = this.props
        return (
            <div id="app-container">
                <ErrorBlock
                    className="block error-block"
                    error={error}
                />
                {/*
                    Uncomment InfoBlock if you want to have control to
                    stop and restart 10 seconds polling of server
                */}
                {/* <InfoBlock
                    className="block"
                    startPolling={this.startPolling}
                    stopPolling={this.props.stopPolling}
                /> */}
                <RateBlock
                    className="block currency-block"
                    baseCurrency={baseCurrency}
                    targetCurrency={targetCurrency}
                    rate={rates[targetCurrency]}
                />
                <BaseBlock
                    className="block currency-block"
                    disabled={isLoading}
                    baseCurrency={baseCurrency}
                    baseValue={baseValue}
                    updateBaseValue={this.props.updateBaseValue}
                    getBase={this.getBase}
                />
                <TargetBlock
                    className="block currency-block"
                    disabled={isLoading}
                    baseValue={baseValue}
                    targetCurrency={targetCurrency}
                    rate={rates[targetCurrency]}
                    getTarget={this.getTarget}
                />
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
    error: state.Exchange.error
})

const mapDispatchToProps = dispatch => ({
    getExchangeRates: base => dispatch(getExchangeRates(base)),
    updateTargetCurrency: currency => dispatch(updateTargetCurrency(currency)),
    updateBaseValue: value => dispatch(updateBaseValue(value)),
    stopPolling: () => dispatch(stopPolling)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
