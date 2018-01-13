import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getExchangeRates } from '../actions'

class Layout extends Component {
    static propTypes = {
        getExchangeRates: PropTypes.func.isRequired,
        rates: PropTypes.shape().isRequired,
        isLoading: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired
    }

    state = {
        currencyFrom: 'USD',
        amountFrom: 0,
        currencyTo: 'GBP',
        amountTo: 0
    }

    componentDidMount() {
        this.props.getExchangeRates(this.state.currencyFrom)
    }

    getCurrentRate = () => {
        const { rates } = this.props
        const { currencyTo } = this.state
        return rates ? rates[currencyTo] : 0
    }

    // TODO: Create dumb component
    currentRateSection = () => {
        const { currencyTo, currencyFrom } = this.state
        const currentRate = this.getCurrentRate()
        return (
            <div id="rate">
                1 {currencyFrom} = {currentRate} {currencyTo}
            </div>
        )
    }

    handleChange = (event) => {
        const value = event.target.value
        this.setState({
            amountFrom: value,
            amountTo: (this.getCurrentRate() * value).toFixed(2)
        })
    }

    render() {
        const { currencyFrom, currencyTo, amountFrom, amountTo } = this.state
        return (
            <div>
                {this.currentRateSection()}
                <div id="from">
                    {currencyFrom}
                    {' '}
                    <input
                        type="number"
                        from="0"
                        step="0.01"
                        value={amountFrom}
                        onChange={this.handleChange}
                    />
                </div>
                <div id="to">
                    {currencyTo}
                    {' '}
                    {amountTo}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    rates: state.Exchange.rates,
    isLoading: state.Exchange.isLoading,
    isError: state.Exchange.isError
})

const mapDispatchToProps = dispatch => ({
    getExchangeRates: base => dispatch(getExchangeRates(base))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
