import React from 'react'
import PropTypes from 'prop-types'

const TargetBlock = ({
    targetCurrency,
    baseValue,
    rate,
    getTarget,
    disabled,
    className
}) => (
    <div id="to" className={className}>
        <button
            className="btn"
            onClick={() => getTarget('previous')}
            disabled={disabled}
        >
            {'\u25c0'}
        </button>
        {`${targetCurrency} ${(rate * baseValue).toFixed(2)}`}
        <button
            className="btn"
            onClick={() => getTarget('next')}
            disabled={disabled}
        >
            {'\u25b6'}
        </button>
    </div>
)

TargetBlock.propTypes = {
    baseValue: PropTypes.number.isRequired,
    targetCurrency: PropTypes.string.isRequired,
    rate: PropTypes.number,
    getTarget: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    className: PropTypes.string
}

TargetBlock.defaultProps = {
    rate: 0,
    className: ''
}

export default TargetBlock
