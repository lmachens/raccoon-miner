import { ALGORITHMS, ALGORITHMS_BY_ID } from './_algorithms';

const parseStatsResponse = (result, minerIdentifier) => {
  const algorithm = ALGORITHMS[minerIdentifier];
  const statistic = result.result.stats.find(statistic => (statistic.algo = algorithm));
  if (!statistic) return {};

  return {
    unpaidBalance: statistic.balance
  };
};

export const getStats = (address, minerIdentifier) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.nicehash.com/api?method=stats.provider&addr=${address}`)
      .then(response => response.json())
      .then(result => {
        const stats = parseStatsResponse(result, minerIdentifier);
        resolve(stats);
      })
      .catch(errorMsg => {
        reject(errorMsg);
      });
  });
};

const parseProfitability = result => {
  const profitability = result.result.simplemultialgo.reduce((prev, curr) => {
    const identifier = ALGORITHMS_BY_ID[curr.algo];
    if (!identifier) return prev;
    return { ...prev, [identifier]: parseFloat(curr.paying) };
  }, {});

  return profitability;
};

export const getProfitability = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.nicehash.com/api?method=simplemultialgo.info')
      .then(response => response.json())
      .then(result => {
        const profitability = parseProfitability(result);
        resolve(profitability);
      })
      .catch(errorMsg => {
        reject(errorMsg);
      });
  });
};
