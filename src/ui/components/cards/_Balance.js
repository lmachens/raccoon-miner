import { Link, StatusCard, Typography } from '../generic';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    fontSize: '1.3rem'
  }
};

class BalanceCard extends Component {
  render() {
    const { classes, currency, balanceInBTC, balanceInUSD } = this.props;

    return (
      <StatusCard
        helperText={
          <Typography>
            This is your unpaid balance. The payout is automatically triggered when you reached the
            payment threshold of 0.001 BTC. See{' '}
            <Link to="https://www.nicehash.com/support">NiceHash support</Link> for more details.
          </Typography>
        }
      >
        <Typography className={classes.load} variant="display1">
          {currency === 'btc' && `${balanceInBTC.toFixed(8)} BTC`}
          {currency === 'usd' && `USD ${balanceInUSD.toFixed(2)}`}
        </Typography>
        <Typography variant="caption">Unpaid Balance</Typography>
      </StatusCard>
    );
  }
}

BalanceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  balanceInBTC: PropTypes.number.isRequired,
  balanceInUSD: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
};

const mapStateToProps = ({
  mining: {
    workerStats: { unpaidBalance = 0 }
  },
  price: { USD = 0 },
  settings: { currency }
}) => {
  const balanceInBTC = unpaidBalance;
  const balanceInUSD = balanceInBTC * USD;
  return {
    balanceInBTC,
    balanceInUSD,
    currency
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(BalanceCard);
export { enhance as BalanceCard };
