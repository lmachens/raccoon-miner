import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Typography } from '../generic';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    margin: 16
  }
};

class Notifications extends PureComponent {
  render() {
    const { classes, currentNotification } = this.props;
    if (!currentNotification) return null;

    const { message, alert } = currentNotification;

    return (
      <div className={classes.container}>
        <Typography color={alert ? 'error' : 'inherit'}>{message}</Typography>
      </div>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  currentNotification: PropTypes.object,
  pastNotifications: PropTypes.array
};

const mapStateToProps = ({ notifications }) => {
  return {
    ...notifications
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Notifications);
export { enhance as Notifications };
