import get from 'lodash/get';

export const SUPPORT_XMR = 'SUPPORT_XMR';
export const supportXMR = {
  name: 'SupportXMR',
  identifier: SUPPORT_XMR,
  servers: ['pool.supportxmr.com'],
  statsUrl: () => 'https://supportxmr.com/#/dashboard',
  apiUrl: address => `https://supportxmr.com/api/miner/${address}/stats`,
  apiParser: result => ({
    unpaidBalance: (get(result, 'amtDue') || 0) / 1000000000000,
    payoutThreshold: 0.3
  })
};
