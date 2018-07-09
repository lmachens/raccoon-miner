export * from './_Settings';
export * from './_Support';

import React, { Fragment, PureComponent } from 'react';

import { LogsDialog } from './_Logs';
import { SettingsDialog } from './_Settings';
import { SupportDialog } from './_Support';
import { WalletDialog } from './_Wallet';

class Dialogs extends PureComponent {
  render() {
    return (
      <Fragment>
        <WalletDialog />
        <SettingsDialog />
        <LogsDialog />
        <SupportDialog />
      </Fragment>
    );
  }
}

export { Dialogs };
