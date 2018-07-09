import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import PropTypes from 'prop-types';
import { SettingsIcon } from '../icons';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openSettingsDialog } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    width: 80,
    height: 80
  }
};

class SettingsButton extends PureComponent {
  render() {
    const { classes, openSettingsDialog } = this.props;

    return (
      <ActionButton onClick={openSettingsDialog} title="Settings">
        <SettingsIcon className={classes.icon} />
      </ActionButton>
    );
  }
}

SettingsButton.propTypes = {
  classes: PropTypes.object.isRequired,
  openSettingsDialog: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    openSettingsDialog: bindActionCreators(openSettingsDialog, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(SettingsButton);
export { enhance as SettingsButton };
