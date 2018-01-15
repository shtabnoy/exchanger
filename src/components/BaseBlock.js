import React from 'react'
import PropTypes from 'prop-types'

const BaseBlock = ({
    baseCurrency,
    baseValue,
    getPreviousBase,
    getNextBase,
    updateBaseValue
}) => (
    <div id="from" className="currency-block">
        <button className="btn" onClick={getPreviousBase}>{'\u25c0'}</button>
        {`${baseCurrency} `}
        <input
            type="number"
            from="0"
            step="0.01"
            value={baseValue}
            onChange={evt => updateBaseValue(+evt.target.value)}
        />
        <button className="btn" onClick={getNextBase}>{'\u25b6'}</button>
    </div>
)

BaseBlock.propTypes = {
    baseCurrency: PropTypes.string.isRequired,
    baseValue: PropTypes.number.isRequired,
    getPreviousBase: PropTypes.func.isRequired,
    getNextBase: PropTypes.func.isRequired,
    updateBaseValue: PropTypes.func.isRequired
}

export default BaseBlock
