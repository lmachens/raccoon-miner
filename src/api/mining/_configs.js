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

const writeFile = ({ fileName, content }) => {
  return new Promise(async (resolve, reject) => {
    simpleIoPlugin.writeLocalAppDataFile(fileName, content, (status, message) => {
      if (status) resolve(status);
      else reject(message);
    });
  });
};

export const writeAMDConfig = content => {
  return writeFile({
    fileName: '/raccoon-miner/amd.txt',
    content
  });
};

export const writeNvidiaConfig = content => {
  return writeFile({
    fileName: '/raccoon-miner/nvidia.txt',
    content
  });
};

export const writeReadme = () => {
  return writeFile({
    fileName: '/raccoon-miner/readme.txt',
    content: 'Raccoon Miner: https://www.overwolf.com/app/leon_machens-raccoon_miner'
  });
};
