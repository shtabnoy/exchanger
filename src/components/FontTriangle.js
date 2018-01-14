import React from 'react'
import PropTypes from 'prop-types'

const FontTriangle = ({ direction }) => (
    <span>
        <If condition={direction === 'left'}>
            {'\u25c0'}
        </If>
        <If condition={direction === 'right'}>
            {'\u25b6'}
        </If>
    </span>
)


FontTriangle.propTypes = {
    direction: PropTypes.oneOf(['left', 'right']).isRequired
}

export default FontTriangle
