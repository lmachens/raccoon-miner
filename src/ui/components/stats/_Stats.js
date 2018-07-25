import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Typography } from '../generic';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { usdNumberFormatter } from '../../../api/utilities';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  btc: {
    display: 'inline-flex',
    alignItems: 'center',
    '& > *': {
      marginLeft: 2
    }
  },
  btcLogo: {
    width: 25,
    height: 25
  },
  niceHashLogo: {
    width: 25,
    height: 25
  }
};

class Stats extends PureComponent {
  render() {
    const { classes, className, price } = this.props;

    return (
      <div className={className}>
        <div className={classes.btc}>
          <img className={classes.btcLogo} src="/assets/btc.png" />
          <Typography variant="subheading">BTC:</Typography>
          <Typography variant="subheading">{usdNumberFormatter.format(price.USD)}</Typography>
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.object
};

const mapStateToProps = ({ price, settings: { currency } }) => {
  return {
    currency,
    price
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Stats);
export { enhance as Stats };
