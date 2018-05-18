import { callOverwolfWithPromise } from './_callWithPromise';

export const getOverwolfUser = async function() {
  const currentUser = await callOverwolfWithPromise(overwolf.profile.getCurrentUser);
  const manifest = await callOverwolfWithPromise(overwolf.extensions.current.getManifest);

  return {
    overwolfVersion: overwolf.version,
    appVersion: manifest.meta.version,
    channel: currentUser.channel,
    userId: currentUser.userId,
    username: currentUser.username,
    partnerId: currentUser.partnerId,
    machineId: currentUser.machineId
  };
};
