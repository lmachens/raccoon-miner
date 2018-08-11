import {
  DialogContentText,
  FormControl,
  FormControlLabel,
  FullScreenDialog,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Switch
} from '../generic';
import React, { Fragment, PureComponent } from 'react';
import { selectMiner, setSettings, setSettingsDialogTab } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { miners } from '../../../api/mining';

export const SETTINGS_DIALOG_GENERAL = 'SETTINGS_DIALOG_GENERAL';
export const SETTINGS_DIALOG_MINING = 'SETTINGS_DIALOG_MINING';

class SettingsDialog extends PureComponent {
  handleTabClick = tab => () => {
    const { setSettingsDialogTab } = this.props;

    setSettingsDialogTab(tab);
  };

  handleSwitchChange = key => event => {
    const { setSettings } = this.props;

    setSettings({ [key]: event.target.checked });
  };

  handleMinerChange = event => {
    const { selectMiner } = this.props;
    const minerIdentifier = event.target.value;
    selectMiner(minerIdentifier);
  };

  handleSelectChange = key => event => {
    const { setSettings } = this.props;

    setSettings({ [key]: event.target.value });
  };

  render() {
    const { open, isMining, tab, settings, selectedMinerIdentifier, profitability } = this.props;

    const menuItems = [
      <MenuItem
        button
        key={SETTINGS_DIALOG_GENERAL}
        onClick={this.handleTabClick(SETTINGS_DIALOG_GENERAL)}
        selected={tab === SETTINGS_DIALOG_GENERAL}
      >
        <ListItemText primary="General" />
      </MenuItem>,
      <MenuItem
        button
        key={SETTINGS_DIALOG_MINING}
        onClick={this.handleTabClick(SETTINGS_DIALOG_MINING)}
        selected={tab === SETTINGS_DIALOG_MINING}
      >
        <ListItemText primary="Mining" />
      </MenuItem>
    ];

    let content;
    if (tab === SETTINGS_DIALOG_GENERAL) {
      content = (
        <Fragment>
          <DialogContentText>General configurations</DialogContentText>
          <FormControl margin="normal">
            <InputLabel htmlFor="region">Region</InputLabel>
            <Select
              inputProps={{
                id: 'region'
              }}
              onChange={this.handleSelectChange('region')}
              value={settings.region}
            >
              <MenuItem value={'br'}>BR</MenuItem>
              <MenuItem value={'eu'}>EU</MenuItem>
              <MenuItem value={'hk'}>HK</MenuItem>
              <MenuItem value={'in'}>IN</MenuItem>
              <MenuItem value={'jp'}>JP</MenuItem>
              <MenuItem value={'usa'}>USA</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="language">Language</InputLabel>
            <Select
              disabled
              inputProps={{
                id: 'language'
              }}
              value={'en'}
            >
              <MenuItem value={'en'}>English</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="currency">Currency</InputLabel>
            <Select
              inputProps={{
                id: 'currency'
              }}
              onChange={this.handleSelectChange('currency')}
              value={settings.currency}
            >
              <MenuItem value={'usd'}>USD</MenuItem>
              <MenuItem value={'btc'}>BTC</MenuItem>
              <MenuItem value={'eur'}>Euro</MenuItem>
            </Select>
          </FormControl>
        </Fragment>
      );
    } else if (tab === SETTINGS_DIALOG_MINING) {
      content = (
        <Fragment>
          <DialogContentText>Mining configurations</DialogContentText>
          <FormControlLabel
            control={
              <Switch
                checked={settings.stopMiningOnGameLaunch}
                color="primary"
                onChange={this.handleSwitchChange('stopMiningOnGameLaunch')}
                value="stopMiningOnGameLaunch"
              />
            }
            label="Stop mining on game launch"
          />
          <FormControl margin="normal">
            <InputLabel htmlFor="crypto-select">Selected Miner</InputLabel>
            <Select
              disabled={isMining}
              inputProps={{
                id: 'crypto-select'
              }}
              onChange={this.handleMinerChange}
              value={selectedMinerIdentifier}
            >
              {miners.map(miner => (
                <MenuItem key={miner.identifier} value={miner.identifier}>
                  {miner.name}{' '}
                  {profitability[miner.identifier] > 0 &&
                    `(${(profitability[miner.identifier] / 1000).toFixed(4)} BTC/MH/day)`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
      );
    }

    return (
      <FullScreenDialog menuItems={menuItems} open={open} title="Settings (under construction)">
        {content}
      </FullScreenDialog>
    );
  }
}

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  setSettingsDialogTab: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  setSettings: PropTypes.func.isRequired,
  isMining: PropTypes.bool.isRequired,
  selectedMinerIdentifier: PropTypes.string.isRequired,
  selectMiner: PropTypes.func.isRequired,
  profitability: PropTypes.object
};

const mapStateToProps = ({
  dialogs: { settingsDialogOpen, settingsDialogTab },
  settings,
  selectedMinerIdentifier,
  activeMiners,
  profitability
}) => {
  return {
    open: settingsDialogOpen,
    tab: settingsDialogTab,
    isMining: activeMiners[selectedMinerIdentifier].isMining,
    settings,
    selectedMinerIdentifier,
    profitability
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSettingsDialogTab: bindActionCreators(setSettingsDialogTab, dispatch),
    setSettings: bindActionCreators(setSettings, dispatch),
    selectMiner: bindActionCreators(selectMiner, dispatch)
  };
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDialog);
export { enhance as SettingsDialog };
