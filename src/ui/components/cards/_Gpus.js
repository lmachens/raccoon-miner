import { AddIcon, RemoveIcon } from '../icons';
import { InfoButton, StatusCard, Typography } from '../generic';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    fontSize: '1.5rem'
  },
  decrease: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  increase: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  iconButton: {
    height: 24,
    width: 24
  }
};

class GpusCard extends Component {
  render() {
    const { classes, gpus, maxGPUs } = this.props;

    return (
      <StatusCard helperText="The number of GPUs you use for mining.">
        <Typography className={classes.load} variant="display1">
          {gpus}/{maxGPUs}
        </Typography>
        <Typography variant="caption">GPU</Typography>
        <InfoButton
          className={classes.decrease}
          iconProps={{ className: classes.iconButton }}
          popover={<Typography>Not implemented yet</Typography>}
        >
          <RemoveIcon className={classes.helpIcon} />
        </InfoButton>
        <InfoButton
          className={classes.increase}
          iconProps={{ className: classes.iconButton }}
          popover={<Typography>Not implemented yet</Typography>}
        >
          <AddIcon className={classes.helpIcon} />
        </InfoButton>
      </StatusCard>
    );
  }
}

GpusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  gpus: PropTypes.number.isRequired,
  maxGPUs: PropTypes.number.isRequired
};

const mapStateToProps = ({
  hardwareInfo: {
    Gpus: { Gpus }
  }
}) => {
  return {
    gpus: Gpus.length,
    maxGPUs: Gpus.length
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(GpusCard);
export { enhance as GpusCard };
