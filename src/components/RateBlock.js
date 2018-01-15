import React from 'react'
import PropTypes from 'prop-types'

const RateBlock = ({
    baseCurrency,
    targetCurrency,
    rate
}) => (
    <div id="rate" className="currency-block">
        {`1 ${baseCurrency} = ${rate} ${targetCurrency}`}
    </div>
)

RateBlock.propTypes = {
    baseCurrency: PropTypes.string.isRequired,
    targetCurrency: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
}

RateBlock.defaultProps = {
    rate: 0
}

export default RateBlock
