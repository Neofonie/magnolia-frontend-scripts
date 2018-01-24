#!/usr/bin/env node

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 6) {
    console.error('You are running Node ' + currentNodeVersion + '.');
    console.error('Please update your version of Node to 6 or higher.');

    process.exit(1);
} else {
    console.log('Using Node '+ currentNodeVersion);
}

require('./neo-scripts');
