import React, { Component } from 'react';

import { IconButton } from './_IconButton';
import { Popover } from './_Popover';
import PropTypes from 'prop-types';

class InfoButton extends Component {
  state = {
    open: false
  };

  handleClickButton = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  anchorEl = null;

  render() {
    const { className, children, popover, iconProps } = this.props;
    const { open } = this.state;

    return (
      <div className={className}>
        <IconButton
          buttonRef={node => {
            this.anchorEl = node;
          }}
          onClick={this.handleClickButton}
          {...iconProps}
        >
          {children}
        </IconButton>

        <Popover anchorEl={this.anchorEl} onClose={this.handleClose} open={open}>
          {popover}
        </Popover>
      </div>
    );
  }
}

InfoButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  popover: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  iconProps: PropTypes.object
};

export { InfoButton };
