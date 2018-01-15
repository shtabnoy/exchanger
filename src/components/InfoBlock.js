import React from 'react'
import PropTypes from 'prop-types'

const InfoBlock = ({
    startPolling,
    stopPolling,
    className
}) => (
    <div className={className}>
        <button onClick={startPolling}>Refresh</button>
        <button onClick={stopPolling}>Stop</button>
    </div>
)

InfoBlock.propTypes = {
    startPolling: PropTypes.func.isRequired,
    stopPolling: PropTypes.func.isRequired,
    className: PropTypes.string
}

InfoBlock.defaultProps = {
    className: ''
}

export default InfoBlock
