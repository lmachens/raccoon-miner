import React, { PureComponent } from 'react';
import { startMining, stopMining } from '../../../store/actions';

import { ActionButton } from './_ActionButton';
import { Avatar } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  avatar: {
    width: 80,
    height: 80
  },
  flip: {
    animation: 'turn 2s infinite'
  },
  '@keyframes turn': {
    to: {
      transform: 'rotateY(360deg)'
    }
  },
  inactive: {
    filter: 'grayscale(100%)'
  }
};

class MiningButton extends PureComponent {
  handleMiningClick = () => {
    const { isMining, startMining, stopMining, minerIdentifier } = this.props;
    if (isMining) stopMining(minerIdentifier);
    else startMining(minerIdentifier);
  };

  render() {
    const { classes, hashRate, isMining } = this.props;
    const initializing = isMining && !hashRate;
    return (
      <ActionButton
        buttonClassName={initializing ? classes.flip : ''}
        onClick={this.handleMiningClick}
        title={isMining ? 'Stop' : 'Start'}
      >
        <Avatar
          className={classNames(classes.avatar, { [classes.inactive]: !isMining })}
          src={'assets/mining.png'}
        />
      </ActionButton>
    );
  }
}

MiningButton.propTypes = {
  classes: PropTypes.object.isRequired,
  hashRate: PropTypes.number.isRequired,
  isMining: PropTypes.bool.isRequired,
  startMining: PropTypes.func.isRequired,
  stopMining: PropTypes.func.isRequired,
  minerIdentifier: PropTypes.string.isRequired
};

const mapStateToProps = ({ selectedMinerIdentifier, activeMiners }) => {
  return {
    hashRate: activeMiners[selectedMinerIdentifier].currentSpeed,
    isMining: activeMiners[selectedMinerIdentifier].isMining,
    minerIdentifier: selectedMinerIdentifier
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startMining: bindActionCreators(startMining, dispatch),
    stopMining: bindActionCreators(stopMining, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MiningButton);
export { enhance as MiningButton };
