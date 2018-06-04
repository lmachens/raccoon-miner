import { DialogContentText, FullScreenDialog, Link } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { miningPoolsByIdentifier } from '../../../api/pools';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  logs: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse'
  }
};

class AdvancedDialog extends PureComponent {
  render() {
    const { classes, open, logs, statsLink } = this.props;

    return (
      <FullScreenDialog open={open} title="Advanced (under construction)">
        <DialogContentText>
          Here you can see advanced details like the mining logs. To get more details from the
          mining pool, click on <Link to={statsLink}>Open Pool Stats</Link>.
        </DialogContentText>
        <code className={classes.logs}>
          {logs.length === 0 && 'No logs available'}
          {logs.map(({ timestamp, line }) => <div key={timestamp}>{line}</div>)}
        </code>
      </FullScreenDialog>
    );
  }
}

AdvancedDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  statsLink: PropTypes.string.isRequired,
  logs: PropTypes.array.isRequired
};

const mapStateToProps = ({
  dialogs: { advancedDialogOpen },
  mining: { miners, selectedMinerIdentifier },
  logs: { mining: miningLogs }
}) => {
  const { address, miningPoolIdentifier } = miners[selectedMinerIdentifier];
  const { statsUrl } = miningPoolsByIdentifier[miningPoolIdentifier];
  const statsLink = statsUrl(address);
  return {
    statsLink,
    open: advancedDialogOpen,
    logs: miningLogs
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AdvancedDialog);
export { enhance as AdvancedDialog };
