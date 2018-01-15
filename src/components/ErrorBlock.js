import React from 'react'
import PropTypes from 'prop-types'

const ErrorBlock = ({
    error,
    className
}) => (
    <If condition={error}>
        <div className={className}>
            {error}
        </div>
    </If>
)

ErrorBlock.propTypes = {
    error: PropTypes.string.isRequired,
    className: PropTypes.string
}

ErrorBlock.defaultProps = {
    className: ''
}

export default ErrorBlock
