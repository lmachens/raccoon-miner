import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  wrapper: {
    margin: 20,
    textAlign: 'center'
  }
};

const PageLayout = ({ classes, children }) => <div className={classes.wrapper}>{children}</div>;

PageLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

const enhance = withStyles(styles)(PageLayout);
export { enhance as PageLayout };
