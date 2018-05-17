import React, { Fragment, PureComponent } from 'react';

import { CryptoDialog } from './_Crypto';
import { SettingsDialog } from './_Settings';
import { StatsDialog } from './_Stats';
import { SupportDialog } from './_Support';

class Dialogs extends PureComponent {
  render() {
    return (
      <Fragment>
        <CryptoDialog />
        <SettingsDialog />
        <StatsDialog />
        <SupportDialog />
      </Fragment>
    );
  }
}

export { Dialogs };
