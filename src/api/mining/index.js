import { CRYPTO_NIGHT_HEAVY, cryptoNightHeavy } from './_cryptoNightHeavy';
import { CRYPTO_NIGHT_V7, cryptoNightV7 } from './_cryptoNightV7';

export * from './_api';
export * from './_configs';
export * from './_xmrStak';
export * from './_cryptoNightHeavy';
export * from './_cryptoNightV7';

export const miners = [cryptoNightV7, cryptoNightHeavy];

export const minersByIdentifier = {
  [CRYPTO_NIGHT_V7]: cryptoNightV7,
  [CRYPTO_NIGHT_HEAVY]: cryptoNightHeavy
};
