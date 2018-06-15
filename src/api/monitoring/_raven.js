import { getOverwolfUser, getVersion } from '../utilities';

import { RAVEN_URL } from '../environment';

const installRaven = async () => {
  window.Raven.config(RAVEN_URL).install();

  const version = await getVersion();
  const overwolfUser = await getOverwolfUser();
  window.Raven.setUserContext({
    version,
    user: overwolfUser
  });
};

export { installRaven };
