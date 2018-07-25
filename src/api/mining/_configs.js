import { simpleIoPlugin } from '../plugins';

export const CUDA_ISSUE_CONFIG = `
"gpu_threads_conf" : [\n\r
  { "index" : 0,\n\r
    "threads" : 15, "blocks" : 60,\n\r
    "bfactor" : 10, "bsleep" :  100,\n\r
    "affine_to_cpu" : false, "sync_mode" : 3,\n\r
  },\n\r
  \n\r
],\n\r
`;

const writeConfig = ({ fileName, content }) => {
  return new Promise(async resolve => {
    simpleIoPlugin.writeLocalAppDataFile(fileName, content, (status, message) => {
      console.log(status, message, fileName, content);
      resolve(status);
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
