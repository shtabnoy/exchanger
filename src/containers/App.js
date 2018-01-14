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
        info: PropTypes.shape().isRequired,
        currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
        targetCurrency: PropTypes.string.isRequired
    }

    state = {
        baseValue: 0
        // amountTo: 0
    }

    componentDidMount() {
        this.props.getExchangeRates(this.getBase())
    }

    getBase = () => this.props.info.base

    // TODO: Refactor next and previous
    getNextBase = () => {
        const { currencies } = this.props
        const len = currencies.length
        const nextCurrencyIndex = currencies.indexOf(this.getBase()) + 1
        this.props.getExchangeRates(currencies[((nextCurrencyIndex % len) + len) % len])
    }

    // TODO: Refactor next and previous
    getPreviousBase = () => {
        const { currencies } = this.props
        const len = currencies.length
        const previousCurrencyIndex = currencies.indexOf(this.getBase()) - 1
        this.props.getExchangeRates(currencies[((previousCurrencyIndex % len) + len) % len])
    }

    // TODO: Refactor TargetCurrency
    getTargetCurrency = () => this.props.targetCurrency

    // TODO: Refactor nextTargetCurrency and previousTargetCurrency
    getNextTarget = () => {
        const filteredCurrencies =
            this.props.currencies.filter(currency => currency !== this.getBase())
        const len = filteredCurrencies.length
        const index = filteredCurrencies.indexOf(this.getTargetCurrency()) + 1
        const targetCurrency = filteredCurrencies[((index % len) + len) % len]
        this.props.setTargetCurrency(targetCurrency)
    }

    // TODO: Refactor nextTargetCurrency and previousTargetCurrency
    getPreviousTarget = () => {
        const filteredCurrencies =
            this.props.currencies.filter(currency => currency !== this.getBase())
        const len = filteredCurrencies.length
        const index = filteredCurrencies.indexOf(this.getTargetCurrency()) - 1
        const targetCurrency = filteredCurrencies[((index % len) + len) % len]
        this.props.setTargetCurrency(targetCurrency)
    }

    getRate = (currency) => {
        const { info: { rates } } = this.props
        return rates ? rates[currency] : 0
    }

    // TODO: Create dumb component
    currentRateSection = () => {
        const targetCurrency = this.getTargetCurrency()
        return (
            <div id="rate" className="currency-block">
                1 {this.getBase()} = {this.getRate(targetCurrency)} {targetCurrency}
            </div>
        )
    }

    handleChange = (event) => {
        const value = event.target.value
        // TODO: Move to redux
        this.setState({
            baseValue: value
        })
        // this.props.setTargetAmount((this.getRate(this.getTargetCurrency()) * value).toFixed(2))
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
                {/* {this.props.targetAmount} */}
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
        const { baseValue } = this.state
        return (
            <div>
                {this.currentRateSection()}
                <div id="from" className="currency-block">
                    <button className="btn" onClick={this.getPreviousBase}>
                        <FontTriangle direction="left" />
                    </button>
                    {this.getBase()}
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
                {this.renderTargetBlock()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currencies: state.Exchange.currencies,
    targetCurrency: state.Exchange.targetCurrency,
    info: state.Exchange.info,
    isLoading: state.Exchange.isLoading,
    isError: state.Exchange.isError
})

const mapDispatchToProps = dispatch => ({
    getExchangeRates: base => dispatch(getExchangeRates(base)),
    setTargetCurrency: currency => dispatch(setTargetCurrency(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
