import {
  DialogContentText,
  FullScreenDialog,
  ListItemText,
  MenuItem,
  Typography
} from '../generic';
import React, { Fragment, PureComponent } from 'react';

import { Discord } from '../support';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSupportDialogTab } from '../../../store/actions';

export const SUPPORT_DIALOG_DISCORD = 'SUPPORT_DIALOG_DISCORD';
export const SUPPORT_DIALOG_FAQ = 'SUPPORT_DIALOG_FAQ';

const FAQEntry = ({ question, answer }) => (
  <Fragment>
    <Typography variant="body2">{question}</Typography>
    <Typography variant="body1">{answer}</Typography>
  </Fragment>
);

FAQEntry.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
};

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
      content = (
        <Fragment>
          <DialogContentText>FAQ (under construction)</DialogContentText>
          <FAQEntry
            answer="A mining pool is the pooling of resources by miners, who share their processing power over
          a network, to split the reward equally, according to the amount of work they contributed
          to the probability of finding a block."
            question="What is a mining pool?"
          />
        </Fragment>
      );
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
