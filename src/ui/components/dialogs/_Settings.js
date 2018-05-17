import { DialogContentText, FullScreenDialog } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SettingsDialog extends PureComponent {
  render() {
    const { open } = this.props;

    return (
      <FullScreenDialog open={open} title="Settings">
        <DialogContentText>
          In this dialog I plan to add settings like <i>Stop mining when in game</i>.
        </DialogContentText>
      </FullScreenDialog>
    );
  }
}

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ dialogs: { settingsDialogOpen } }) => {
  return {
    open: settingsDialogOpen
  };
};

const enhance = connect(mapStateToProps)(SettingsDialog);
export { enhance as SettingsDialog };
