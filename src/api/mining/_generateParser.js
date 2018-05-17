export const SPEED_REGEX = 'SPEED_REGEX';
export const CONNECTION_FAILED_REGEX = 'CONNECTION_FAILED_REGEX';
export const CONNECTING = 'CONNECTING';

export const generateParser = regex => line => {
  const result = {
    timestamp: Date.now()
  };
  //console.info(line);
  if (regex.SPEED_REGEX) {
    const parsed = line.match(regex.SPEED_REGEX);
    if (parsed) result.speed = parseFloat(parsed[1]);
  }
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
