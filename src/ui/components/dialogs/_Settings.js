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

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSettingsDialogTab } from '../../../store/actions';

export const SETTINGS_DIALOG_GENERAL = 'SETTINGS_DIALOG_GENERAL';
export const SETTINGS_DIALOG_MINING = 'SETTINGS_DIALOG_MINING';

class SettingsDialog extends PureComponent {
  handleTabClick = tab => () => {
    const { setSettingsDialogTab } = this.props;

    setSettingsDialogTab(tab);
  };

  render() {
    const { open, tab } = this.props;

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
        </Fragment>
      );
    } else if (tab === SETTINGS_DIALOG_MINING) {
      content = (
        <Fragment>
          <DialogContentText>Mining configurations</DialogContentText>
          <FormControlLabel
            control={<Switch checked={false} disabled value="stopMiningIngame" />}
            label="Stop mining when in game"
          />
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
  setSettingsDialogTab: PropTypes.func.isRequired
};

const mapStateToProps = ({ dialogs: { settingsDialogOpen, settingsDialogTab } }) => {
  return {
    open: settingsDialogOpen,
    tab: settingsDialogTab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSettingsDialogTab: bindActionCreators(setSettingsDialogTab, dispatch)
  };
};

const enhance = connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
export { enhance as SettingsDialog };
