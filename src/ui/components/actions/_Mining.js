import React, { PureComponent } from 'react';
import { startMining, stopMining } from '../../../store/actions';

import { ActionButton } from './_ActionButton';
import { Avatar } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
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
  }
};

class MiningButton extends PureComponent {
  handleMiningClick = () => {
    const { isMining, startMining, stopMining, minerIdentifier } = this.props;
    if (isMining) stopMining(minerIdentifier);
    else startMining(minerIdentifier);
  };

  render() {
    const { classes, isMining } = this.props;

    return (
      <ActionButton
        buttonClassName={isMining ? classes.flip : ''}
        onClick={this.handleMiningClick}
        title={isMining ? 'Stop' : 'Start'}
      >
        <Avatar className={classes.avatar} src={'assets/mining.png'} />
      </ActionButton>
    );
  }
}

MiningButton.propTypes = {
  classes: PropTypes.object.isRequired,
  isMining: PropTypes.bool.isRequired,
  startMining: PropTypes.func.isRequired,
  stopMining: PropTypes.func.isRequired,
  minerIdentifier: PropTypes.string.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier }, activeMiners }) => {
  return {
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

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(
  MiningButton
);
export { enhance as MiningButton };
