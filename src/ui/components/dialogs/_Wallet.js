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
import { addressHint, developerAddress, isValidAddress } from '../../../api/nice-hash';
import { fetchMiningMetrics, loadDefault, setMiningAddress } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

  render() {
    const { open, address, isMining, isValidAddress, loadDefault } = this.props;

    return (
      <FullScreenDialog open={open} title="Wallet">
        <DialogContentText>
          You have to tell the raccoon your Bitcoin address or NiceHash account to receive payments.
          We recommend to use NiceHash for lower{' '}
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
          disabled={true}
          fullWidth
          helperText="Use a unique name if you use Raccoon Miner on multiple computers."
          label="Worker name"
          margin="normal"
          value="raccoon"
        />
      </FullScreenDialog>
    );
  }
}

WalletDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool.isRequired,
  loadDefault: PropTypes.func.isRequired,
  setMiningAddress: PropTypes.func.isRequired,
  selectedMinerIdentifier: PropTypes.string.isRequired,
  fetchMiningMetrics: PropTypes.func.isRequired
};

const mapStateToProps = ({
  dialogs: { cryptoDialogOpen },
  mining: { miners, selectedMinerIdentifier },
  activeMiners
}) => {
  const { address } = miners[selectedMinerIdentifier];
  return {
    open: cryptoDialogOpen,
    minerIdentifier: selectedMinerIdentifier,
    address,
    isValidAddress: isValidAddress(address),
    isMining: activeMiners[selectedMinerIdentifier].isMining,
    selectedMinerIdentifier
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDefault: bindActionCreators(loadDefault, dispatch),
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch),
    fetchMiningMetrics: bindActionCreators(fetchMiningMetrics, dispatch)
  };
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletDialog);
export { enhance as WalletDialog };
