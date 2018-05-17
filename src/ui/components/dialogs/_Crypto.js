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
import { ethereum, getMiner, monero } from '../../../api/mining';
import { loadDefault, selectMiner, setMiningAddress } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CryptoDialog extends PureComponent {
  handleAddressChange = event => {
    const { setMiningAddress, minerIdentifier } = this.props;

    const address = event.target.value;
    setMiningAddress(minerIdentifier, address);
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
      loadDefault
    } = this.props;

    return (
      <FullScreenDialog open={open} title="Wallet">
        <DialogContentText>
          Before you can start mining, you have to tell the raccoon what to mine and who gets the
          profit. You can <Link onClick={loadDefault}>load the default settings</Link> if you want
          to try out this app.
        </DialogContentText>
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
            {[ethereum, monero].map(miner => (
              <MenuItem key={miner.name} value={miner.identifier}>
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
            disabled
            inputProps={{
              id: 'pool-select'
            }}
            onChange={this.handleCurrencyChange}
            value={selectedMinerIdentifier}
          >
            <MenuItem value={miner.identifier}>Coming soon</MenuItem>
          </Select>
        </FormControl>
        <TextField
          disabled={isMining}
          fullWidth
          helperText={<Link to={miner.links.wallet}>Don&apos;t have a wallet address?</Link>}
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
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool.isRequired,
  loadDefault: PropTypes.func.isRequired,
  setMiningAddress: PropTypes.func.isRequired,
  selectedMinerIdentifier: PropTypes.string.isRequired,
  selectMiner: PropTypes.func.isRequired
};

const mapStateToProps = ({
  dialogs: { cryptoDialogOpen },
  mining: { miners, selectedMinerIdentifier },
  activeMiners
}) => {
  const miner = getMiner(selectedMinerIdentifier);
  const address = miners[selectedMinerIdentifier].address;
  return {
    open: cryptoDialogOpen,
    minerIdentifier: selectedMinerIdentifier,
    address,
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
    selectMiner: bindActionCreators(selectMiner, dispatch)
  };
};

const enhance = connect(mapStateToProps, mapDispatchToProps)(CryptoDialog);
export { enhance as CryptoDialog };
