import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { AssessmentIcon } from '../icons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openLogsDialog } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    width: 80,
    height: 80
  }
};

class LogsButton extends PureComponent {
  render() {
    const { classes, openLogsDialog } = this.props;

    return (
      <ActionButton onClick={openLogsDialog} title="Logs">
        <AssessmentIcon className={classes.icon} />
      </ActionButton>
    );
  }
}

LogsButton.propTypes = {
  classes: PropTypes.object.isRequired,
  openLogsDialog: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    openLogsDialog: bindActionCreators(openLogsDialog, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(LogsButton);
export { enhance as LogsButton };
