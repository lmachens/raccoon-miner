import { Button, DialogContentText, FullScreenDialog, Link } from '../generic';
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
          I want to fetch more data from the mining pools dashboard and explain it here.
          <p>
            <Link to={miner.links.stats(address)}>
              <Button>Open Pool Stats</Button>
            </Link>
          </p>
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
