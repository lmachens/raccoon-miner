const fs = require('fs');
const zipFolder = require('./helpers/zipFolder');
const releaseOnGitHub = require('./helpers/releaseOnGitHub');
const env = require('../.env.json');

// read current version
const packageJson = require('../package.json');
const version = packageJson.version;

// create a file to stream archive data to.
const filename = `${__dirname}/raccoon_miner_${version}.zip`;
const output = fs.createWriteStream(filename);
const folder = 'dist/dev';
const gitHubReleaseToken = env.CONVENTIONAL_GITHUB_RELEASER_TOKEN;

zipFolder({ filename, output, folder }, () => {
  releaseOnGitHub({ filename, gitHubReleaseToken, version }, () => {
    fs.unlink(filename, console.log);
  });
});
