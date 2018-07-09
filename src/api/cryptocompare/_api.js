export const getPrice = () => {
  return new Promise((resolve, reject) => {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR')
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(errorMsg => {
        reject(errorMsg);
      });
  });
};
