const fs = require('fs-extra');
const path = require('path');
const os = require('os');

async function readFile() {}

module.exports = {
    Basic: fs.readFileSync(path.resolve('./Basic.vue')),
};
