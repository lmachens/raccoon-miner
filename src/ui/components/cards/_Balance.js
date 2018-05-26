import React, { Component } from 'react';
import { StatusCard, Typography } from '../generic';

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

class BalanceCard extends Component {
  render() {
    const {
      classes,
      miner,
      workerStats: { unpaidBalance, payoutThreshold }
    } = this.props;

    return (
      <StatusCard
        helperText={`This is the balance reported by the mining pool. The payout is automatically triggered when you reached the payment threshold of ${payoutThreshold} ${
          miner.currency
        }.`}
      >
        <Typography className={classes.load} variant="display1">
          {(unpaidBalance || 0).toFixed(10)} {miner.currency}
        </Typography>
        <Typography variant="caption">
          Unpaid Balance (Payment at {payoutThreshold} {miner.currency})
        </Typography>
      </StatusCard>
    );
  }
}

BalanceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  miner: PropTypes.object.isRequired,
  workerStats: PropTypes.object.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    miner: minersByIdentifier[selectedMinerIdentifier],
    workerStats: miners[selectedMinerIdentifier].workerStats
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps))(BalanceCard);
export { enhance as BalanceCard };
