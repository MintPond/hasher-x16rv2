hasher-x16rv2
=============

This repo is adapted for use with MintPond from the original repo which is located at https://github.com/traysi/x16rv2_hash/

This module has been developed and tested on [Node v10.16.3](https://nodejs.org/) and [Ubuntu 16.04](http://releases.ubuntu.com/16.04/)

## Install ##
__Install as Dependency in NodeJS Project__
```bash
# Install from Github git package

sudo apt-get install build-essential
npm install mintpond/hasher-x16rv2 --save
```
-or-
```bash
# Install from Github NPM repository

sudo apt-get install build-essential
npm config set @mintpond:registry https://npm.pkg.github.com/mintpond
npm config set //npm.pkg.github.com/:_authToken <MY_GITHUB_AUTH_TOKEN>

npm install @mintpond/hasher-x16rv2@1.0.0 --save
```

__Install & Test__
```bash
# Install nodejs v10
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs -y

# Download hasher-x16rv2
git clone https://github.com/MintPond/hasher-x16rv2

# build
cd hasher-x16rv2
sudo apt-get install build-essential
npm install
npm test
```

## Usage ##
__Hash__
```js
const hasher = require('hasher-x16rv2');

/**
 * Hash 80-byte input.
 *
 * @param inputBuf {Buffer} 80-byte input to hash.
 * @param [outputBuf] {Buffer} Optional 32-byte buffer to copy result into.
 * @returns {Buffer} The outputBuf or a new Buffer containing the hash result.
 */
const result = hasher.x16rv2(input);

console.log(result.toString('hex'));
```

__Hash into Output Buffer__
```js
const hasher = require('hasher-x16rv2');

const resultOut = Buffer.alloc(32); // Output buffer must be 32-bytes.

hasher.x16rv2(input, resultOut);

console.log(resultOut.toString('hex'));
```