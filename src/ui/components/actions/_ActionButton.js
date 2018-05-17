import { IconButton, Typography } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    margin: 4,
    display: 'inline-block'
  },
  button: {
    width: 100,
    height: 100
  }
};

class ActionButton extends PureComponent {
  render() {
    const { classes, buttonClassName, onClick, children, title } = this.props;

    return (
      <div className={classes.container}>
        <IconButton className={classNames(classes.button, buttonClassName)} onClick={onClick}>
          {children}
        </IconButton>
        <Typography variant="button">{title}</Typography>
      </div>
    );
  }
}

ActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const enhance = withStyles(styles)(ActionButton);
export { enhance as ActionButton };
