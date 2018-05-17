import { currentWindowId } from './_currentWindowId';

export const minimize = () => {
  overwolf.windows.minimize(currentWindowId);
};
