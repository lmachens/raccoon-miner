import { Link, StatusCard, Typography } from '../generic';
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { minersByIdentifier } from '../../../api/mining';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    fontSize: '1.5rem'
  }
};

class HashRateCard extends Component {
  render() {
    const { classes, hashRate, miner } = this.props;

    return (
      <StatusCard
        helperText={
          <Fragment>
            The Hash Rate indicates your mining speed.{' '}
            <Link to={`https://gpustats.com/coin/${miner.currency}`}>
              Get a list of hashrates by GPU.
            </Link>
          </Fragment>
        }
      >
        <Typography className={classes.load} variant="display1">
          {hashRate}
          {miner.speedUnit}
        </Typography>
        <Typography variant="caption">Hash Rate</Typography>
      </StatusCard>
    );
  }
}

HashRateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  hashRate: PropTypes.number.isRequired,
  miner: PropTypes.object.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier }, activeMiners }) => {
  return {
    miner: minersByIdentifier[selectedMinerIdentifier],
    hashRate: activeMiners[selectedMinerIdentifier].currentSpeed
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(HashRateCard);
export { enhance as HashRateCard };
