import React from 'react'
import PropTypes from 'prop-types'

const BaseBlock = ({
    baseCurrency,
    baseValue,
    getBase,
    updateBaseValue,
    disabled,
    className
}) => (
    <div id="from" className={className}>
        <button
            className="btn"
            onClick={() => getBase('previous')}
            disabled={disabled}
        >
            {'\u25c0'}
        </button>
        <span>{`${baseCurrency} `}</span>
        <input
            type="number"
            from="0"
            step="0.01"
            value={baseValue}
            onChange={evt => updateBaseValue(+evt.target.value)}
        />
        <button
            className="btn"
            onClick={() => getBase('next')}
            disabled={disabled}
        >
            {'\u25b6'}
        </button>
    </div>
)

BaseBlock.propTypes = {
    baseCurrency: PropTypes.string.isRequired,
    baseValue: PropTypes.number.isRequired,
    getBase: PropTypes.func.isRequired,
    updateBaseValue: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    className: PropTypes.string
}

BaseBlock.defaultProps = {
    className: ''
}

export default BaseBlock
