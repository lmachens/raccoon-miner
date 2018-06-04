import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { AssessmentIcon } from '../icons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openAdvancedDialog } from '../../../store/actions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    width: 80,
    height: 80
  }
};

class AdvancedButton extends PureComponent {
  render() {
    const { classes, openAdvancedDialog } = this.props;

    return (
      <ActionButton onClick={openAdvancedDialog} title="Advanced">
        <AssessmentIcon className={classes.icon} />
      </ActionButton>
    );
  }
}

AdvancedButton.propTypes = {
  classes: PropTypes.object.isRequired,
  openAdvancedDialog: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    openAdvancedDialog: bindActionCreators(openAdvancedDialog, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(AdvancedButton);
export { enhance as AdvancedButton };
