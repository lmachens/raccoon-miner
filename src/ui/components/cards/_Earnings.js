import { Link, StatusCard, Typography } from '../generic';
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { minersByIdentifier } from '../../../api/mining';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    fontSize: '1.3rem'
  }
};

class EarningsCard extends Component {
  render() {
    const { classes, currency, profitPerDayInBTC, profitPerDayInUSD, miner } = this.props;

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
          {currency === 'btc' && `${profitPerDayInBTC.toFixed(8)} BTC`}
          {currency === 'usd' && `USD ${profitPerDayInUSD.toFixed(2)}`}
        </Typography>
        <Typography variant="caption">Daily estimated earnings</Typography>
      </StatusCard>
    );
  }
}

EarningsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  profitPerDayInBTC: PropTypes.number.isRequired,
  profitPerDayInUSD: PropTypes.number.isRequired,
  miner: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired
};

const mapStateToProps = ({
  mining: { selectedMinerIdentifier },
  activeMiners,
  profitability,
  price,
  settings: { currency }
}) => {
  const hashRate = activeMiners[selectedMinerIdentifier].currentSpeed;
  const profitPerDayInBTC = (profitability[selectedMinerIdentifier] * hashRate) / 1000000000;
  const profitPerDayInUSD = profitPerDayInBTC * price.USD;
  return {
    miner: minersByIdentifier[selectedMinerIdentifier],
    profitPerDayInBTC,
    profitPerDayInUSD,
    currency
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(EarningsCard);
export { enhance as EarningsCard };
