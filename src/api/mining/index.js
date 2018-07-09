import { CRYPTO_NIGHT_V7, cryptoNightV7 } from './_cryptoNightV7';

export * from './_cryptoNightV7';

export const miners = [cryptoNightV7];

export const minersByIdentifier = {
  [CRYPTO_NIGHT_V7]: cryptoNightV7
};
