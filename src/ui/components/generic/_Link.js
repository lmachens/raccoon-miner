import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette }) => ({
  link: {
    color: palette.primary.main,
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
      color: palette.primary.main
    }
  }
});

class Link extends Component {
  handleClick = event => {
    const { to, onClick } = this.props;
    if (onClick) onClick(event);

    if (to) {
      event.preventDefault();
      overwolf.utils.openUrlInDefaultBrowser(to);
    }
  };

  render() {
    const { children, classes, to = '#' } = this.props;
    return (
      <a className={classes.link} href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string
};

const LinkEnhanced = withStyles(styles)(Link);
export { LinkEnhanced as Link };
