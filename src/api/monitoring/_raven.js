import { getOverwolfUser, getVersion } from '../utilities';

const installRaven = async () => {
  window.Raven.config('https://567a64e71d344d34b0e7f0c773082c64@sentry.io/1208859').install();

  const version = await getVersion();
  const overwolfUser = await getOverwolfUser();
  window.Raven.setUserContext({
    version,
    user: overwolfUser
  });
};

export { installRaven };
