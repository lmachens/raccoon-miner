export const CONNECTION_FAILED_REGEX = 'CONNECTION_FAILED_REGEX';
export const CONNECTING = 'CONNECTING';
export const CUDA_ERROR = 'CUDA_ERROR';

export const generateParser = regex => line => {
  const result = {
    timestamp: Date.now()
  };
  //console.info(`%c${line}`, 'color: orange');
  if (regex.CONNECTION_FAILED_REGEX) {
    const parsed = line.match(regex.CONNECTION_FAILED_REGEX);
    if (parsed) result.errorMsg = 'Connection failed';
  }
  if (regex.CONNECTING) {
    const parsed = line.match(regex.CONNECTING);
    if (parsed) result.connecting = true;
  }
  if (regex.CUDA_ERROR) {
    const parsed = line.match(regex.CUDA_ERROR);
    if (parsed) result.cudaError = true;
  }
  return result;
};
