import React from 'react'
import PropTypes from 'prop-types'

const RateBlock = ({
    baseCurrency,
    targetCurrency,
    rate,
    className
}) => (
    <div id="rate" className={className}>
        {`1 ${baseCurrency} = ${rate} ${targetCurrency}`}
    </div>
)

RateBlock.propTypes = {
    baseCurrency: PropTypes.string.isRequired,
    targetCurrency: PropTypes.string.isRequired,
    rate: PropTypes.number,
    className: PropTypes.string
}

RateBlock.defaultProps = {
    rate: 0,
    className: ''
}

export default RateBlock
