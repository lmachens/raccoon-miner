import { AppBar, Toolbar, Typography } from '../components/generic';
import React, { Fragment, PureComponent } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { initializeHotReload } from '../../api/hot-reload';
import { prepareSimpleIoPlugin } from '../../api/plugins';
import { resetLogs } from '../../store/actions';
import { withStyles } from '@material-ui/core/styles';
import { writeReadme } from '../../api/mining';

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

class AppLayout extends PureComponent {
  state = {
    initialized: false
  };

  componentDidMount() {
    const { resetLogs } = this.props;
    resetLogs();
    prepareSimpleIoPlugin().then(() => {
      writeReadme();
      initializeHotReload();
      this.setState({ initialized: true });
    });
  }

  componentWillUnmount() {}

  render() {
    const { classes, children, version } = this.props;
    const { initialized } = this.state;

    return (
      <Fragment>
        <AppBar color="inherit" position="sticky">
          <Toolbar>
            <img className={classes.textLogo} src="assets/text_logo.png" />
            <Typography className={classes.version} variant="subheading">
              v{version}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.children}>{initialized && children}</div>
      </Fragment>
    );
  }
}

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  resetLogs: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired
};

const mapStateToProps = ({ utilities: { version } }) => {
  return {
    version
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetLogs: bindActionCreators(resetLogs, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AppLayout);
export { enhance as AppLayout };
