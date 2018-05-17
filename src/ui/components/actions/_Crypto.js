import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { Avatar } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';
import { openCryptoDialog } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  avatar: {
    width: 80,
    height: 80
  }
};

class CryptoButton extends PureComponent {
  render() {
    const { classes, openCryptoDialog, miner } = this.props;

    return (
      <ActionButton onClick={openCryptoDialog} title="Wallet">
        <Avatar className={classes.avatar} src={miner.logo} />
      </ActionButton>
    );
  }
}

CryptoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  openCryptoDialog: PropTypes.func.isRequired,
  miner: PropTypes.object.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier } }) => {
  return {
    miner: getMiner(selectedMinerIdentifier)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCryptoDialog: bindActionCreators(openCryptoDialog, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(
  CryptoButton
);
export { enhance as CryptoButton };
