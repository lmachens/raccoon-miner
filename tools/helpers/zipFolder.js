const archiver = require('archiver');

const zipFolder = ({ filename, output, folder }, callback) => {
  const archive = archiver('zip', {
    zlib: { level: 9 } // compression level.
  });

  output.on('close', () => {
    console.log(`${filename} created with ${archive.pointer()} total bytes'`);
    callback();
  });

  archive.pipe(output);
  archive.directory(folder, false);
  archive.finalize();
};

module.exports = zipFolder;
