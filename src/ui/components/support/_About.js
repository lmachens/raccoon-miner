import { Link, Typography } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  logo: {
    width: 240,
    float: 'right',
    marginLeft: 4
  }
};

class About extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <img className={classes.logo} src={'assets/logo.png'} />
        <Typography>
          Raccoon Miner is an open source (GNU GPLv3) project developed by Leon Machens. You can
          find the source code on <Link to="https://github.com/lmachens/raccoon-miner">GitHub</Link>
          .<br />
          Feel free to contribute!
        </Typography>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = withStyles(styles)(About);
export { enhance as About };
