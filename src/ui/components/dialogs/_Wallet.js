import {
  DialogContentText,
  FullScreenDialog,
  InfoButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '../generic';
import { DoneIcon, ErrorIcon } from '../icons';
import React, { PureComponent } from 'react';
import { addressHint, developerAddress, isValidAddress, statsUrl } from '../../../api/nice-hash';
import {
  fetchMiningMetrics,
  loadDefault,
  setMiningAddress,
  setWorkerName
} from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  niceHashLogo: {
    height: 20,
    width: 20,
    verticalAlign: 'text-bottom'
  }
};

class WalletDialog extends PureComponent {
  componentWillUnmount() {
    const { fetchMiningMetrics } = this.props;
    fetchMiningMetrics();
  }

  handleAddressChange = event => {
    const { setMiningAddress, minerIdentifier } = this.props;

    const address = event.target.value;
    setMiningAddress(minerIdentifier, address);
  };

  handleWorkerNameChange = event => {
    const { setWorkerName, minerIdentifier } = this.props;

    const workerName = event.target.value;
    setWorkerName(minerIdentifier, workerName);
  };

  render() {
    const {
      open,
      classes,
      address,
      isMining,
      isValidAddress,
      loadDefault,
      workerName
    } = this.props;

    return (
      <FullScreenDialog open={open} title="Wallet">
        <DialogContentText>
          You have to tell the raccoon your Bitcoin address or{' '}
          <img className={classes.niceHashLogo} src="/assets/nice-hash.png" /> NiceHash account to
          receive payments. We recommend to use NiceHash for lower{' '}
          <Link to="https://www.nicehash.com/help/fees">service fees</Link>.<br />
          <Link onClick={loadDefault}>Load test settings</Link> if you want to try out this app.
        </DialogContentText>
        {isMining && (
          <Typography color="error">
            You have to stop mining before you can change these settings!
          </Typography>
        )}
        <TextField
          disabled={isMining}
          fullWidth
          helperText={
            <>
              <Link to={'https://www.nicehash.com/register'}>
                Don&apos;t have a NiceHash account or bitcoin wallet?
              </Link>
              {developerAddress === address && ' Test address selected!'}
            </>
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <InfoButton
                  popover={
                    <Typography>
                      {isValidAddress ? 'Valid address' : `Invalid address! ${addressHint}`}
                    </Typography>
                  }
                >
                  {isValidAddress ? <DoneIcon /> : <ErrorIcon color="error" />}
                </InfoButton>
              </InputAdornment>
            )
          }}
          label="Your Bitcoin address"
          margin="normal"
          onChange={this.handleAddressChange}
          placeholder={developerAddress}
          value={address}
        />
        <TextField
          fullWidth
          helperText={
            <>
              Set a unique name to track this computer on{' '}
              <Link to={statsUrl(address)}>NiceHash stats page</Link>
            </>
          }
          label="Worker name"
          margin="normal"
          onChange={this.handleWorkerNameChange}
          placeholder="raccoon"
          value={workerName}
        />
      </FullScreenDialog>
    );
  }
}

WalletDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool.isRequired,
  loadDefault: PropTypes.func.isRequired,
  setMiningAddress: PropTypes.func.isRequired,
  selectedMinerIdentifier: PropTypes.string.isRequired,
  setWorkerName: PropTypes.func.isRequired,
  fetchMiningMetrics: PropTypes.func.isRequired,
  workerName: PropTypes.string.isRequired
};

const mapStateToProps = ({
  dialogs: { cryptoDialogOpen },
  mining: { miners, selectedMinerIdentifier },
  activeMiners
}) => {
  const { address, workerName } = miners[selectedMinerIdentifier];
  return {
    open: cryptoDialogOpen,
    minerIdentifier: selectedMinerIdentifier,
    address,
    isValidAddress: isValidAddress(address),
    isMining: activeMiners[selectedMinerIdentifier].isMining,
    selectedMinerIdentifier,
    workerName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDefault: bindActionCreators(loadDefault, dispatch),
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch),
    fetchMiningMetrics: bindActionCreators(fetchMiningMetrics, dispatch),
    setWorkerName: bindActionCreators(setWorkerName, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WalletDialog);
export { enhance as WalletDialog };
