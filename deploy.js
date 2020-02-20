const del = require('del');
const ncp = require('ncp').ncp;

const source = 'build'
const destination = 'docs';

ncp.limit = 16;

(async () => {
    const deletedPaths = await del([destination + '/*']);
    console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
    ncp(source, destination, function (err) {
        if (err) return console.error(err);
        console.log('Copied ' + source  + " to " + destination);
    });
})();
