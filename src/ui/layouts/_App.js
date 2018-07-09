import { AppBar, Toolbar, Typography } from '../components/generic';
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  children: {
    overflow: 'auto',
    height: 'calc(100% - 64px)'
  },
  flex: {
    marginLeft: 4,
    flex: 1
  },
  textLogo: {
    height: 18
  },
  version: {
    margin: 2,
    paddingTop: 7
  }
};

const AppLayout = ({ classes, children, version }) => (
  <Fragment>
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <img className={classes.textLogo} src="assets/text_logo.png" />
        <Typography className={classes.version} variant="subheading">
          v{version}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.children}>{children}</div>
  </Fragment>
);

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  version: PropTypes.string.isRequired
};

const mapStateToProps = ({ utilities: { version } }) => {
  return {
    version
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AppLayout);
export { enhance as AppLayout };
