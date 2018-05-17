var githubRemoveAllReleases = require('github-remove-all-releases');
const env = require('../.env.json');

var AUTH = {
  type: 'oauth',
  token: env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
};

githubRemoveAllReleases(AUTH, 'lmachens', 'raccoon-miner', console.log);
