import get from 'lodash/get';

export const ETHERMINE = 'ETHERMINE';
export const ethermine = {
  name: 'Ethermine',
  identifier: ETHERMINE,
  servers: ['eu1.ethermine.org:4444', 'us1.ethermine.org:4444'],
  statsUrl: address => `https://ethermine.org/miners/${address}/dashboard`,
  apiUrl: address => `https://api.ethermine.org/miner/${address}/dashboard`,
  apiParser: result => ({
    unpaidBalance: (get(result, 'data.currentStatistics.unpaid') || 0) / 1000000000000000000,
    payoutThreshold:
      (get(result, 'data.settings.minPayout') || 1000000000000000000) / 1000000000000000000
  })
};
