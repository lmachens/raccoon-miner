import { BalanceCard, CpusCard, EarningsCard, GpusCard } from '../components/cards';
import React, { PureComponent } from 'react';

import { Actions } from '../components/actions';
import { Dialogs } from '../components/dialogs';
import { Grid } from '../components/generic';
import { Notifications } from '../components/notifications';
import { PageLayout } from '../layouts';
import PropTypes from 'prop-types';
import { Stats } from '../components/stats';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  stats: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    width: '100%'
  }
};

class MiningPage extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <PageLayout>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Actions />
          </Grid>
          <Grid item xs={2}>
            <CpusCard />
          </Grid>
          <Grid item xs={2}>
            <GpusCard />
          </Grid>
          <Grid item xs={4}>
            <EarningsCard />
          </Grid>
          <Grid item xs={4}>
            <BalanceCard />
          </Grid>
        </Grid>
        <Notifications />
        <Stats className={classes.stats} />
        <Dialogs />
      </PageLayout>
    );
  }
}

MiningPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhanced = withStyles(styles)(MiningPage);
export { enhanced as MiningPage };
