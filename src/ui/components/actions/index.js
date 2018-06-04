import React, { PureComponent } from 'react';

import { AdvancedButton } from './_Advanced';
import { CryptoButton } from './_Crypto';
import { MiningButton } from './_Mining';
import PropTypes from 'prop-types';
import { SettingsButton } from './_Settings';
import { SupportButton } from './_Support';
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
        <CryptoButton />
        <AdvancedButton />
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
