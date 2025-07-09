// node modules
const crypto = require('crypto');

console.log(`Secret key: `, crypto.randomBytes(128).toString('base64'));
console.log(`Secret refresh key: `, crypto.randomBytes(64).toString('base64'));
