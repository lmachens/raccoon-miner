import { AddIcon, RemoveIcon } from '../icons';
import { IconButton, StatusCard, Typography } from '../generic';
import React, { PureComponent } from 'react';
import { addGPU, removeGPU } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMaxGPUs } from '../../../api/benchmarking';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    fontSize: '1.3rem'
  },
  remove: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 24,
    width: 24
  },
  add: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 24,
    width: 24
  }
};

class GpusCard extends PureComponent {
  handleAdd = () => {
    const { addGPU } = this.props;
    addGPU();
  };

  handleRemove = () => {
    const { removeGPU } = this.props;
    removeGPU();
  };

  render() {
    const { classes, gpus, maxGPUs } = this.props;

    return (
      <StatusCard helperText="The number of GPUs you use for mining.">
        <Typography className={classes.load} variant="display1">
          {gpus}/{maxGPUs}
        </Typography>
        <Typography variant="caption">GPU</Typography>
        <IconButton className={classes.remove} disabled={gpus === 0} onClick={this.handleRemove}>
          <RemoveIcon className={classes.helpIcon} />
        </IconButton>
        <IconButton className={classes.add} disabled={gpus + 1 > maxGPUs} onClick={this.handleAdd}>
          <AddIcon className={classes.helpIcon} />
        </IconButton>
      </StatusCard>
    );
  }
}

GpusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  gpus: PropTypes.number.isRequired,
  maxGPUs: PropTypes.number.isRequired,
  addGPU: PropTypes.func.isRequired,
  removeGPU: PropTypes.func.isRequired
};

const mapStateToProps = ({
  hardwareInfo: {
    Gpus: { Gpus }
  },
  gpus
}) => {
  const maxGPUs = getMaxGPUs(Gpus);

  return {
    gpus,
    maxGPUs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGPU: bindActionCreators(addGPU, dispatch),
    removeGPU: bindActionCreators(removeGPU, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GpusCard);
export { enhance as GpusCard };
