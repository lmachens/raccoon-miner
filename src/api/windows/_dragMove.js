import { currentWindowId } from './_currentWindowId';

export const dragMove = () => {
  overwolf.windows.dragMove(currentWindowId);
};
