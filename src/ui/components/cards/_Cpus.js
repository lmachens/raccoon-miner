import React, { Component } from 'react';
import { StatusCard, Typography } from '../generic';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    fontSize: '1.5rem'
  }
};

class CpusCard extends Component {
  render() {
    const { classes, totalLoad } = this.props;

    return (
      <StatusCard helperText="Your current CPU load">
        <Typography className={classes.load} variant="display1">
          {totalLoad.toString()}%
        </Typography>
        <Typography variant="caption">CPU</Typography>
      </StatusCard>
    );
  }
}

CpusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  totalLoad: PropTypes.number.isRequired
};

const mapStateToProps = ({ hardwareInfo: { Cpus } }) => {
  if (!Cpus.length) return { totalLoad: 0 };
  const firstCpu = Cpus[0];
  const firstCpuLoad = firstCpu.Load.find(load => load.Name === 'CPU Total');
  const totalLoad = parseInt(firstCpuLoad.Value / firstCpuLoad.Max * 100);

  return {
    totalLoad
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps))(CpusCard);
export { enhance as CpusCard };
