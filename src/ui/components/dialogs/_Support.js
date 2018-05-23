import { Discord, FAQ } from '../support';
import { FullScreenDialog, ListItemText, MenuItem } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSupportDialogTab } from '../../../store/actions';

export const SUPPORT_DIALOG_DISCORD = 'SUPPORT_DIALOG_DISCORD';
export const SUPPORT_DIALOG_FAQ = 'SUPPORT_DIALOG_FAQ';

class SupportDialog extends PureComponent {
  handleTabClick = tab => () => {
    const { setSupportDialogTab } = this.props;

    setSupportDialogTab(tab);
  };

  render() {
    const { open, tab } = this.props;

    const menuItems = [
      <MenuItem
        button
        key={SUPPORT_DIALOG_DISCORD}
        onClick={this.handleTabClick(SUPPORT_DIALOG_DISCORD)}
        selected={tab === SUPPORT_DIALOG_DISCORD}
      >
        <ListItemText primary="Chat" />
      </MenuItem>,
      <MenuItem
        button
        key={SUPPORT_DIALOG_FAQ}
        onClick={this.handleTabClick(SUPPORT_DIALOG_FAQ)}
        selected={tab === SUPPORT_DIALOG_FAQ}
      >
        <ListItemText primary="FAQ" />
      </MenuItem>
    ];

    let content;
    if (tab === SUPPORT_DIALOG_DISCORD) {
      content = <Discord />;
    } else if (tab === SUPPORT_DIALOG_FAQ) {
      content = <FAQ />;
    }

    return (
      <FullScreenDialog menuItems={menuItems} open={open} title="Support">
        {content}
      </FullScreenDialog>
    );
  }
}

SupportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  setSupportDialogTab: PropTypes.func.isRequired
};

const mapStateToProps = ({ dialogs: { supportDialogOpen, supportDialogTab } }) => {
  return {
    open: supportDialogOpen,
    tab: supportDialogTab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSupportDialogTab: bindActionCreators(setSupportDialogTab, dispatch)
  };
};

const enhance = connect(mapStateToProps, mapDispatchToProps)(SupportDialog);
export { enhance as SupportDialog };
