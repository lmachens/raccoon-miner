import { DialogContentText, FullScreenDialog, Link } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { statsUrl } from '../../../api/nice-hash';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  logs: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse'
  }
};

class LogsDialog extends PureComponent {
  render() {
    const { classes, open, logs, statsLink } = this.props;

    return (
      <FullScreenDialog open={open} title="Logs (under construction)">
        <DialogContentText>
          Here you can see the mining logs. To get more details from the mining pool, click on{' '}
          <Link to={statsLink}>Open Pool Stats</Link>.
        </DialogContentText>
        <code className={classes.logs}>
          {logs.length === 0 && 'No logs available'}
          {logs.map(({ line }, index) => <div key={index}>{line}</div>)}
        </code>
      </FullScreenDialog>
    );
  }
}

LogsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  statsLink: PropTypes.string.isRequired,
  logs: PropTypes.array.isRequired
};

const mapStateToProps = ({
  dialogs: { logsDialogOpen },
  mining: { miners, selectedMinerIdentifier },
  logs: { mining: miningLogs }
}) => {
  const { address } = miners[selectedMinerIdentifier];
  const statsLink = statsUrl(address);
  return {
    statsLink,
    open: logsDialogOpen,
    logs: miningLogs
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(LogsDialog);
export { enhance as LogsDialog };
