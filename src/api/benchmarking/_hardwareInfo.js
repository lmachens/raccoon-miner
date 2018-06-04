const interval = 1;

const requestHardwareInfo = listener => {
  console.log('request hardware info');
  overwolf.benchmarking.requestHardwareInfo(interval, ({ reason }) => {
    console.log(reason);
    if (reason === 'Permissions Required') {
      overwolf.benchmarking.requestPermissions(({ status }) => {
        if (status === 'success') {
          requestHardwareInfo();
        }
      });
    } else {
      overwolf.benchmarking.onHardwareInfoReady.removeListener(listener);
    }
  });
};

export const addHardwareInfoListener = listener => {
  overwolf.benchmarking.onHardwareInfoReady.addListener(listener);
  requestHardwareInfo(listener);
};
