import React, { PureComponent } from 'react';

import { LogsButton } from './_Logs';
import { MiningButton } from './_Mining';
import PropTypes from 'prop-types';
import { SettingsButton } from './_Settings';
import { SupportButton } from './_Support';
import { WalletButton } from './_Wallet';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  center: {
    textAlign: 'center'
  }
};

class Actions extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.center}>
        <WalletButton />
        <LogsButton />
        <MiningButton />
        <SettingsButton />
        <SupportButton />
      </div>
    );
  }
}

Actions.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = withStyles(styles)(Actions);
export { enhance as Actions };
