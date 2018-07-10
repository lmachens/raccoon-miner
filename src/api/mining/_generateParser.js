export const CONNECTION_FAILED_REGEX = 'CONNECTION_FAILED_REGEX';
export const CONNECTING = 'CONNECTING';

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
  return result;
};
