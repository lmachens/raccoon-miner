export const developerAddress = '3QDZkfUqrzYc2KccWSemuGKUqoMNQmqiDV';
export const isValidAddress = address => /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/i.test(address);
export const addressHint = 'It should have 26-35 characters.';

export const statsUrl = address => `https://www.nicehash.com/miner/${address}`;

export * from './_api';
