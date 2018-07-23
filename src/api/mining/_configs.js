import { getSimpleIoPlugin } from '../plugins';

export const CUDA_ISSUE_CONFIG = `
"gpu_threads_conf" : [\n
  { "index" : 0,\n
    "threads" : 15, "blocks" : 60,\n
    "bfactor" : 10, "bsleep" :  100,\n
    "affine_to_cpu" : false, "sync_mode" : 3,\n
  },\n
  \n
],\n
`;

const writeConfig = ({ fileName, content }) => {
  return new Promise(async resolve => {
    getSimpleIoPlugin().then(simpleIoPlugin => {
      simpleIoPlugin.writeLocalAppDataFile(fileName, content, (status, message) => {
        console.log(status, message, fileName, content);
        resolve(status);
      });
    });
  });
};

export const writeAMDConfig = content => {
  return writeConfig({
    fileName: '/raccoon-miner/amd.txt',
    content
  });
};

export const writeNvidiaConfig = content => {
  return writeConfig({
    fileName: '/raccoon-miner/nvidia.txt',
    content
  });
};
