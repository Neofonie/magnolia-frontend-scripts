#!/usr/bin/env node

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 6) {
    console.error('[neo-script] You are running Node ' + currentNodeVersion + '.');
    console.error('[neo-script] Please update your version of Node to 6 or higher.');

    process.exit(1);
} else {
    console.log('[neo-script] Using Node: '+ currentNodeVersion);
}

const task = process.argv.length > 1 ? process.argv[2] : undefined;
console.log('[neo-script] Starting task: ' + task);

const gtasks = require('./index');
gtasks.series(task, function (done) {
    console.log('[neo-script] Finished task: ' + task);
    done();
})();
