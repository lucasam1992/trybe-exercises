const fs = require('fs').promises;

async function readFile(fileName) {
    const content = await fs.readFile(fileName,'utf-8')
    .catch(() =>{return null});
    return content;
}

module.exports = readFile;