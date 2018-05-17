import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { AssessmentIcon } from '../icons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openStatsDialog } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    width: 80,
    height: 80
  }
};

class StatsButton extends PureComponent {
  render() {
    const { classes, openStatsDialog } = this.props;

    return (
      <ActionButton onClick={openStatsDialog} title="Stats">
        <AssessmentIcon className={classes.icon} />
      </ActionButton>
    );
  }
}

StatsButton.propTypes = {
  classes: PropTypes.object.isRequired,
  openStatsDialog: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    openStatsDialog: bindActionCreators(openStatsDialog, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(null, mapDispatchToProps))(StatsButton);
export { enhance as StatsButton };
