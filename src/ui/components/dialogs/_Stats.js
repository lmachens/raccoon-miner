import { DialogContentText, FullScreenDialog, Link } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { miningPoolsByIdentifier } from '../../../api/pools';

class StatsDialog extends PureComponent {
  render() {
    const { open, statsLink } = this.props;

    return (
      <FullScreenDialog open={open} title="Stats">
        <DialogContentText>
          A mining pool is the pooling of resources by miners, who share their processing power over
          a network, to split the reward equally, according to the amount of work they contributed
          to the probability of finding a block. <Link to={statsLink}>Open Pool Stats</Link>
        </DialogContentText>
      </FullScreenDialog>
    );
  }
}

StatsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  statsLink: PropTypes.string.isRequired
};

const mapStateToProps = ({
  dialogs: { statsDialogOpen },
  mining: { miners, selectedMinerIdentifier }
}) => {
  const { address, miningPoolIdentifier } = miners[selectedMinerIdentifier];
  const { statsUrl } = miningPoolsByIdentifier[miningPoolIdentifier];
  const statsLink = statsUrl(address);
  return {
    statsLink,
    open: statsDialogOpen
  };
};

const enhance = connect(mapStateToProps)(StatsDialog);
export { enhance as StatsDialog };
