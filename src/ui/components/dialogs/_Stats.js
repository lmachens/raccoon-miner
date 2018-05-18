import { DialogContentText, FullScreenDialog, Link } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';

class StatsDialog extends PureComponent {
  render() {
    const { address, miner, open } = this.props;

    return (
      <FullScreenDialog open={open} title="Stats">
        <DialogContentText>
          A mining pool is the pooling of resources by miners, who share their processing power over
          a network, to split the reward equally, according to the amount of work they contributed
          to the probability of finding a block.{' '}
          <Link to={miner.links.stats(address)}>Open Pool Stats</Link>
        </DialogContentText>
      </FullScreenDialog>
    );
  }
}

StatsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  miner: PropTypes.object.isRequired
};

const mapStateToProps = ({
  dialogs: { statsDialogOpen },
  mining: { miners, selectedMinerIdentifier }
}) => {
  const miner = getMiner(selectedMinerIdentifier);
  const address = miners[selectedMinerIdentifier].address;

  return {
    address,
    miner,
    open: statsDialogOpen
  };
};

const enhance = connect(mapStateToProps)(StatsDialog);
export { enhance as StatsDialog };
