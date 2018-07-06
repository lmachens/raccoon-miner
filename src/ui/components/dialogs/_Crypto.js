import {
  DialogContentText,
  FormControl,
  FullScreenDialog,
  InfoButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography
} from '../generic';
import { DoneIcon, ErrorIcon } from '../icons';
import React, { PureComponent } from 'react';
import { loadDefault, selectMiner, setMiningAddress, setMiningPool } from '../../../store/actions';
import { miners, minersByIdentifier } from '../../../api/mining';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { miningPoolsByMinerIdentifier } from '../../../api/pools';

class CryptoDialog extends PureComponent {
  handleAddressChange = event => {
    const { setMiningAddress, minerIdentifier } = this.props;

    const address = event.target.value;
    setMiningAddress(minerIdentifier, address);
  };

  handleMiningPoolChange = event => {
    const { setMiningPool, minerIdentifier } = this.props;

    const miningPoolIdentifier = event.target.value;
    setMiningPool(minerIdentifier, miningPoolIdentifier);
  };

  handleCurrencyChange = event => {
    const { selectMiner } = this.props;
    const minerIdentifier = event.target.value;
    selectMiner(minerIdentifier);
  };

  render() {
    const {
      open,
      address,
      miner,
      isMining,
      isValidAddress,
      selectedMinerIdentifier,
      miningPoolIdentifier,
      loadDefault
    } = this.props;

    return (
      <FullScreenDialog open={open} title="Wallet">
        <DialogContentText>
          Before you can start mining, you have to tell the raccoon what to mine and who gets the
          profit. You can <Link onClick={loadDefault}>load the test settings</Link> if you want to
          try out this app.
        </DialogContentText>
        {isMining && (
          <Typography color="error">
            You have to stop mining before you can change these settings!
          </Typography>
        )}
        <FormControl margin="normal">
          <InputLabel htmlFor="crypto-select">Currency</InputLabel>
          <Select
            disabled={isMining}
            inputProps={{
              id: 'crypto-select'
            }}
            onChange={this.handleCurrencyChange}
            value={selectedMinerIdentifier}
          >
            {miners.map(miner => (
              <MenuItem key={miner.identifier} value={miner.identifier}>
                {miner.name} ({miner.currency})
              </MenuItem>
            ))}
            <MenuItem disabled value={null}>
              More coming soon
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="pool-select">Mining Pool</InputLabel>
          <Select
            inputProps={{
              id: 'pool-select'
            }}
            onChange={this.handleMiningPoolChange}
            value={miningPoolIdentifier}
          >
            {miningPoolsByMinerIdentifier[selectedMinerIdentifier].map(miningPool => (
              <MenuItem key={miningPool.identifier} value={miningPool.identifier}>
                {miningPool.name}
              </MenuItem>
            ))}
            <MenuItem disabled value={null}>
              More coming soon
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          disabled={isMining}
          fullWidth
          helperText={
            <Typography>
              <Link to={miner.links.wallet}>Don&apos;t have a wallet address?</Link>
              {miner.developerAddress === address && ' Test address selected!'}
            </Typography>
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <InfoButton
                  popover={
                    <Typography>
                      {isValidAddress ? 'Valid address' : `Invalid address! ${miner.addressHint}`}
                    </Typography>
                  }
                >
                  {isValidAddress ? <DoneIcon /> : <ErrorIcon color="error" />}
                </InfoButton>
              </InputAdornment>
            )
          }}
          label={`${miner.name} address`}
          margin="normal"
          onChange={this.handleAddressChange}
          placeholder={miner.developerAddress}
          value={address}
        />
      </FullScreenDialog>
    );
  }
}

CryptoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  miner: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  miningPoolIdentifier: PropTypes.string.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool.isRequired,
  loadDefault: PropTypes.func.isRequired,
  setMiningAddress: PropTypes.func.isRequired,
  selectedMinerIdentifier: PropTypes.string.isRequired,
  selectMiner: PropTypes.func.isRequired,
  setMiningPool: PropTypes.func.isRequired
};

const mapStateToProps = ({
  dialogs: { cryptoDialogOpen },
  mining: { miners, selectedMinerIdentifier },
  activeMiners
}) => {
  const miner = minersByIdentifier[selectedMinerIdentifier];
  const { address, miningPoolIdentifier } = miners[selectedMinerIdentifier];
  return {
    open: cryptoDialogOpen,
    minerIdentifier: selectedMinerIdentifier,
    address,
    miningPoolIdentifier,
    isValidAddress: miner.isValidAddress(address),
    miner,
    isMining: activeMiners[selectedMinerIdentifier].isMining,
    selectedMinerIdentifier
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDefault: bindActionCreators(loadDefault, dispatch),
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch),
    selectMiner: bindActionCreators(selectMiner, dispatch),
    setMiningPool: bindActionCreators(setMiningPool, dispatch)
  };
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptoDialog);
export { enhance as CryptoDialog };
