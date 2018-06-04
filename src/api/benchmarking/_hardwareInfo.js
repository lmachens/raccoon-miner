const interval = 200;

const requestHardwareInfo = () => {
  overwolf.benchmarking.requestHardwareInfo(interval, result => {
    if (result.reason === 'Permissions Required') {
      overwolf.benchmarking.requestPermissions(({ status }) => {
        if (status === 'success') {
          requestHardwareInfo();
        }
      });
    }
  });
};

export const addHardwareInfoListener = listener => {
  overwolf.benchmarking.onHardwareInfoReady.addListener(listener);
  requestHardwareInfo(listener);
};

export const removeHardwareInfoListener = listener => {
  overwolf.benchmarking.onHardwareInfoReady.removeListener(listener);
};
