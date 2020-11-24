import React from 'react'
import PropTypes from 'prop-types'
import withHover from './witHover'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}

function Tooltip ({ text, children, hovering }) {
  return (
    <div style={styles.container}>
      {/* text shows when hovered */}
      { hovering && <div style={styles.tooltip}>{text}</div>}
      {/* children is what you hover over */}
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired,
}

// whatever witHover returns is whats rendered when you call toolTip
export default withHover(Tooltip, 'hovering')
