import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { HelpIcon } from '../icons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openSupportDialog } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    width: 80,
    height: 80
  }
};

class SupportButton extends PureComponent {
  render() {
    const { classes, openSupportDialog } = this.props;

    return (
      <ActionButton onClick={openSupportDialog} title="Support">
        <HelpIcon className={classes.icon} />
      </ActionButton>
    );
  }
}

SupportButton.propTypes = {
  classes: PropTypes.object.isRequired,
  openSupportDialog: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    openSupportDialog: bindActionCreators(openSupportDialog, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(SupportButton);
export { enhance as SupportButton };
