export const callOverwolfWithPromise = (method, ...params) => {
  return new Promise((resolve, reject) => {
    const handleResult = result => {
      if (result) return resolve(result);
      return reject(result);
    };

    if (params) {
      method(...params, handleResult);
    } else {
      method(handleResult);
    }
  });
};
