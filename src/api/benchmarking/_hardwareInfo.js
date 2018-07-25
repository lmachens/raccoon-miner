import get from 'lodash/get';

const interval = 1000;

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

export const getMaxCores = cpus => {
  return cpus.reduce((pre, cur) => {
    return pre + cur.NumCores;
  }, 0);
};

export const getMaxGPUs = gpus => {
  return gpus.length;
};

export const getTemperatures = hardwareInfo => {
  if (!hardwareInfo) return;
  const cpus = hardwareInfo.Cpus.map(cpu => {
    return cpu.Temperatures;
  });
  const gpus = hardwareInfo.Gpus.Gpus.map(gpu => {
    return gpu.Temperatures;
  });
  const mainboard = get(hardwareInfo, 'Mainboard.Temperatures');
  let max = 0;
  [...cpus, ...gpus, mainboard].forEach(child => {
    child.forEach(temp => {
      if (max < temp.Value) max = temp.Value;
    });
  });
  return {
    cpus,
    gpus,
    mainboard,
    max
  };
};
