export * from './_Settings';
export * from './_Support';

import React, { Fragment, PureComponent } from 'react';

import { AdvancedDialog } from './_Advanced';
import { CryptoDialog } from './_Crypto';
import { SettingsDialog } from './_Settings';
import { SupportDialog } from './_Support';

class Dialogs extends PureComponent {
  render() {
    return (
      <Fragment>
        <CryptoDialog />
        <SettingsDialog />
        <AdvancedDialog />
        <SupportDialog />
      </Fragment>
    );
  }
}

export { Dialogs };
