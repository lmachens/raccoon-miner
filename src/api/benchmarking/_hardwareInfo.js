const interval = 1000;

const requestHardwareInfo = () => {
  console.log('request hardware info');
  overwolf.benchmarking.requestHardwareInfo(interval, ({ reason }) => {
    console.log(reason);
    if (reason === 'Permissions Required') {
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
  requestHardwareInfo();
};
