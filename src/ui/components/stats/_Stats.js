import React, { PureComponent } from 'react';
import { eurNumberFormatter, usdNumberFormatter } from '../../../api/utilities';

import { FanIcon } from '../icons';
import PropTypes from 'prop-types';
import { Typography } from '../generic';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getTemperatures } from '../../../api/benchmarking';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  marginLeft: {
    marginLeft: 4
  },
  btc: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  btcLogo: {
    width: 25,
    height: 25,
    marginBottom: 2
  },
  niceHashLogo: {
    width: 25,
    height: 25,
    marginBottom: 2
  },
  fanIcon: {
    marginBottom: 2
  },
  hashRate: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 0
  },
  temperature: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 0
  }
};

class Stats extends PureComponent {
  render() {
    const { classes, className, currency, hashRate, price, temperatures } = this.props;

    return (
      <div className={className}>
        <div className={classes.hashRate}>
          <img className={classes.niceHashLogo} src="/assets/nice-hash.png" />
          <Typography className={classes.marginLeft} variant="subheading">
            {hashRate} H/s
          </Typography>
        </div>
        <div className={classes.btc}>
          <img className={classes.btcLogo} src="/assets/btc.png" />
          <Typography className={classes.marginLeft} variant="subheading">
            BTC:
          </Typography>
          <Typography className={classes.marginLeft} variant="subheading">
            {(currency === 'usd' || currency === 'btc') && usdNumberFormatter.format(price.USD)}
            {currency === 'eur' && eurNumberFormatter.format(price.EUR)}
          </Typography>
        </div>
        <div className={classes.temperature}>
          <FanIcon className={classes.fanIcon} />
          <Typography className={classes.marginLeft} variant="subheading">
            {temperatures && temperatures.max}°C
          </Typography>
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  hashRate: PropTypes.number,
  price: PropTypes.object,
  temperatures: PropTypes.object
};

const mapStateToProps = ({
  mining: { selectedMinerIdentifier },
  activeMiners,
  hardwareInfo,
  price,
  settings: { currency }
}) => {
  const temperatures = getTemperatures(hardwareInfo);
  const hashRate = activeMiners[selectedMinerIdentifier].currentSpeed;
  return {
    currency,
    price,
    temperatures,
    hashRate
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Stats);
export { enhance as Stats };
