import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import PropTypes from 'prop-types';
import { WalletIcon } from '../icons';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openWalletDialog } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    width: 80,
    height: 80
  }
};

class WalletButton extends PureComponent {
  render() {
    const { classes, openWalletDialog } = this.props;

    return (
      <ActionButton onClick={openWalletDialog} title="Wallet">
        <WalletIcon className={classes.icon} />
      </ActionButton>
    );
  }
}

WalletButton.propTypes = {
  classes: PropTypes.object.isRequired,
  openWalletDialog: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    openWalletDialog: bindActionCreators(openWalletDialog, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(WalletButton);
export { enhance as WalletButton };
