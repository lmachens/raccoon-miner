const conventionalGithubReleaser = require('conventional-github-releaser');
const ghReleaseAssets = require('gh-release-assets');
var request = require('request');

const releaseOnGitHub = ({ filename, gitHubReleaseToken, version }, callback) => {
  const auth = {
    type: 'oauth',
    token: gitHubReleaseToken
  };

  conventionalGithubReleaser(
    auth,
    {
      preset: 'angular'
    },
    error => {
      if (error) console.error(error);
      request(
        {
          url: 'https://api.github.com/repos/lmachens/raccoon-miner/releases',
          headers: {
            'User-Agent': 'Raccoon-Miner'
          }
        },
        (error, response, body) => {
          const releases = JSON.parse(body);
          const currentRelease = releases.find(release => release.tag_name === `v${version}`);

          ghReleaseAssets(
            {
              url: currentRelease.upload_url,
              token: [gitHubReleaseToken],
              assets: [filename]
            },
            error => {
              if (error) console.error(error);
              callback();
            }
          );
        }
      );
    }
  );
};

module.exports = releaseOnGitHub;
