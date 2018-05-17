export const callOverwolfWithPromise = (method, ...params) => {
  return new Promise((resolve, reject) => {
    const handleResult = result => {
      if (result) return resolve(result);
      return reject(result);
    };

    console.log(method, params);
    if (params) {
      method(...params, handleResult);
    } else {
      method(handleResult);
    }
  });
};
