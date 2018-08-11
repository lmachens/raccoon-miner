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
    flexDirection: 'column',
    userSelect: 'text'
  }
};

class Logs extends PureComponent {
  componentDidMount() {
    this.lastItem.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate() {
    this.lastItem.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { classes, logs } = this.props;

    if (logs.length === 0) return 'No logs available';
    return (
      <code className={classes.logs}>
        {logs.split('\n').map((text, line) => (
          <span key={line}>{text}</span>
        ))}
        <span
          ref={value => {
            this.lastItem = value;
          }}
        />
      </code>
    );
  }
}

Logs.propTypes = {
  classes: PropTypes.object.isRequired,
  logs: PropTypes.string
};

const logsMapStateToProps = ({ logs }) => {
  return {
    logs
  };
};

const LogsEnhanced = compose(
  withStyles(styles),
  connect(logsMapStateToProps)
)(Logs);

class LogsDialog extends PureComponent {
  render() {
    const { open, statsLink } = this.props;

    return (
      <FullScreenDialog open={open} title="Logs">
        <DialogContentText>
          Here you can see the mining logs. To get more details from the mining pool, click on{' '}
          <Link to={statsLink}>NiceHash Stats</Link>.
        </DialogContentText>
        {open && <LogsEnhanced />}
      </FullScreenDialog>
    );
  }
}

LogsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  statsLink: PropTypes.string.isRequired
};

const mapStateToProps = ({ dialogs: { logsDialogOpen }, selectedMinerIdentifier, miners }) => {
  const { address } = miners[selectedMinerIdentifier];
  const statsLink = statsUrl(address);
  return {
    statsLink,
    open: logsDialogOpen
  };
};

const enhance = connect(mapStateToProps)(LogsDialog);
export { enhance as LogsDialog };
