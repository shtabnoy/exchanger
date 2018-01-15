import React from 'react'
import PropTypes from 'prop-types'

const TargetBlock = ({
    targetCurrency,
    baseValue,
    rate,
    getPreviousTarget,
    getNextTarget
}) => (
    <div id="to" className="currency-block">
        <button className="btn" onClick={getPreviousTarget}>{'\u25c0'}</button>
        {`${targetCurrency} ${(rate * baseValue).toFixed(2)}`}
        <button className="btn" onClick={getNextTarget}>{'\u25b6'}</button>
    </div>
)

TargetBlock.propTypes = {
    baseValue: PropTypes.number.isRequired,
    targetCurrency: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    getPreviousTarget: PropTypes.func.isRequired,
    getNextTarget: PropTypes.func.isRequired
}

TargetBlock.defaultProps = {
    rate: 0
}

export default TargetBlock
