import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    getExchangeRates,
    setTargetCurrency
} from '../actions'
import FontTriangle from '../components/FontTriangle'
import './App.scss'

class App extends Component {
    static propTypes = {
        getExchangeRates: PropTypes.func.isRequired,
        setTargetCurrency: PropTypes.func.isRequired,
        // isLoading: PropTypes.bool.isRequired,
        // isError: PropTypes.bool.isRequired,
        baseCurrency: PropTypes.string.isRequired,
        rates: PropTypes.shape({
            [PropTypes.string]: PropTypes.number
        }).isRequired,
        currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
        targetCurrency: PropTypes.string.isRequired
    }

    state = {
        baseValue: 0
    }

    componentDidMount() {
        this.props.getExchangeRates(this.getBaseCurrency())
    }

    getBaseCurrency = () => this.props.baseCurrency

    // TODO: Refactor next and previous
    getNextBase = () => {
        const { currencies } = this.props
        const len = currencies.length
        const nextCurrencyIndex = currencies.indexOf(this.getBaseCurrency()) + 1
        this.props.getExchangeRates(currencies[((nextCurrencyIndex % len) + len) % len])
    }

    // TODO: Refactor next and previous
    getPreviousBase = () => {
        const { currencies } = this.props
        const len = currencies.length
        const previousCurrencyIndex = currencies.indexOf(this.getBaseCurrency()) - 1
        this.props.getExchangeRates(currencies[((previousCurrencyIndex % len) + len) % len])
    }

    // TODO: Refactor TargetCurrency
    getTargetCurrency = () => this.props.targetCurrency

    // TODO: Refactor nextTargetCurrency and previousTargetCurrency
    getNextTarget = () => {
        const filteredCurrencies =
            this.props.currencies.filter(currency => currency !== this.getBaseCurrency())
        const len = filteredCurrencies.length
        const index = filteredCurrencies.indexOf(this.getTargetCurrency()) + 1
        const targetCurrency = filteredCurrencies[((index % len) + len) % len]
        this.props.setTargetCurrency(targetCurrency)
    }

    // TODO: Refactor nextTargetCurrency and previousTargetCurrency
    getPreviousTarget = () => {
        const filteredCurrencies =
            this.props.currencies.filter(currency => currency !== this.getBaseCurrency())
        const len = filteredCurrencies.length
        const index = filteredCurrencies.indexOf(this.getTargetCurrency()) - 1
        const targetCurrency = filteredCurrencies[((index % len) + len) % len]
        this.props.setTargetCurrency(targetCurrency)
    }

    getRate = (currency) => {
        const { rates } = this.props
        return rates ? rates[currency] : 0
    }

    // TODO: Create dumb component
    currentRateSection = () => {
        const targetCurrency = this.getTargetCurrency()
        return (
            <div id="rate" className="currency-block">
                1 {this.getBaseCurrency()} = {this.getRate(targetCurrency)} {targetCurrency}
            </div>
        )
    }

    handleChange = (event) => {
        const value = event.target.value
        this.setState({
            baseValue: value
        })
    }

    renderBaseBlock = () => {
        const { baseValue } = this.state
        return (
            <div id="from" className="currency-block">
                <button className="btn" onClick={this.getPreviousBase}>
                    <FontTriangle direction="left" />
                </button>
                {this.getBaseCurrency()}
                {' '}
                <input
                    type="number"
                    from="0"
                    step="0.01"
                    value={baseValue}
                    onChange={this.handleChange}
                />
                <button className="btn" onClick={this.getNextBase}>
                    <FontTriangle direction="right" />
                </button>
            </div>
        )
    }

    renderTargetBlock = () => {
        const targetCurrency = this.getTargetCurrency()
        const { baseValue } = this.state
        return (
            <div id="to" className="currency-block">
                <button className="btn" onClick={this.getPreviousTarget}>
                    <FontTriangle direction="left" />
                </button>
                {targetCurrency}
                {' '}
                {(this.getRate(targetCurrency) * baseValue).toFixed(2)}
                <button className="btn" onClick={this.getNextTarget}>
                    <FontTriangle direction="right" />
                </button>
            </div>
        )
    }

    // TODO: Disable buttons until request is finished
    // TODO: Add error displaying
    render() {
        return (
            <div>
                {this.currentRateSection()}
                {this.renderBaseBlock()}
                {this.renderTargetBlock()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currencies: state.Exchange.currencies,
    targetCurrency: state.Exchange.targetCurrency,
    baseCurrency: state.Exchange.exchangeData.base,
    rates: state.Exchange.exchangeData.rates,
    isLoading: state.Exchange.isLoading,
    isError: state.Exchange.isError
})

const mapDispatchToProps = dispatch => ({
    getExchangeRates: base => dispatch(getExchangeRates(base)),
    setTargetCurrency: currency => dispatch(setTargetCurrency(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
