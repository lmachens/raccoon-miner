import React, { PureComponent } from 'react';

import { AppBar } from './_AppBar';
import { Button } from './_Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import { Toolbar } from './_Toolbar';
import { Typography } from './_Typography';
import { bindActionCreators } from 'redux';
import { closeDialog } from '../../../store/actions';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

export { default as DialogContentText } from '@material-ui/core/DialogContentText';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8
  }
};

class FullScreenDialog extends PureComponent {
  render() {
    const { classes, children, closeDialog, open, title } = this.props;

    return (
      <Dialog fullScreen onClose={closeDialog} open={open}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.flex} color="inherit" variant="title">
              {title}
            </Typography>
            <Button color="inherit" onClick={closeDialog}>
              Done
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.content}>{children}</DialogContent>
      </Dialog>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch)
  };
};

const enhanced = compose(withStyles(styles), connect(null, mapDispatchToProps))(FullScreenDialog);

export { enhanced as FullScreenDialog };
