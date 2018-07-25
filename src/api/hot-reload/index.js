import { APP_PATH, HOT_RELOAD_FILES } from '../environment';

import { simpleIoPlugin } from '../plugins';

export const initializeHotReload = () => {
  if (HOT_RELOAD_FILES) {
    simpleIoPlugin.onFileListenerChanged.addListener(fileIdentifier => {
      if (HOT_RELOAD_FILES.includes(fileIdentifier)) {
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });

    const skipToEndOfFile = true;
    HOT_RELOAD_FILES.forEach(fileName => {
      const path = `${APP_PATH}/${fileName}`;
      simpleIoPlugin.listenOnFile(fileName, path, skipToEndOfFile, () => {});
    });

    console.info('%cHot reload is active', 'color: blue');
  }
};
