const path = require('path');
const fs = require('fs');
const {v4:uuid} =require('uuid');
const codeDir = path.join(__dirname,"codes");

if(!fs.existsSync(codeDir)){
    fs.mkdirSync(codeDir,{recursive: true});
}


const generateFile = async(format,content) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(codeDir,filename);
    await fs.writeFileSync(filepath,content);
    return filepath;
};

module.exports = {
    generateFile,
};