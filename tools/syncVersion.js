const fs = require('fs');

const packageJson = require('../package.json');
const devManifestJson = require('../dist/dev/manifest.json');
const productionManifestJson = require('../dist/production/manifest.json');

devManifestJson.meta.version = packageJson.version;
const newDevManifestJson = Object.assign({}, devManifestJson, { version: packageJson.version });
// This path is relative to node caller path
fs.writeFileSync('./dist/dev/manifest.json', JSON.stringify(newDevManifestJson, null, 2));

productionManifestJson.meta.version = packageJson.version;
const newProductionManifestJson = Object.assign({}, productionManifestJson, {
  version: packageJson.version
});
// This path is relative to node caller path
fs.writeFileSync(
  './dist/production/manifest.json',
  JSON.stringify(newProductionManifestJson, null, 2)
);
