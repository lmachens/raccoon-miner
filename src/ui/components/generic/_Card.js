import Card from '@material-ui/core/Card';
import { HelpIcon } from '../icons';
import { InfoButton } from './_InfoButton';
import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from './_Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    textAlign: 'center',
    padding: 16,
    position: 'relative'
  },
  info: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  iconButton: {
    height: 24,
    width: 24
  },
  helpIcon: {
    height: 18,
    width: 18
  }
};

const StatusCard = ({ classes, className, helperText, children }) => (
  <Card className={classNames(classes.root, className)}>
    {helperText && (
      <InfoButton
        className={classes.info}
        iconProps={{ className: classes.iconButton }}
        popover={<Typography>{helperText}</Typography>}
      >
        <HelpIcon className={classes.helpIcon} />
      </InfoButton>
    )}
    {children}
  </Card>
);

StatusCard.propTypes = {
  helperText: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

const enhance = withStyles(styles)(StatusCard);
export { enhance as StatusCard };
