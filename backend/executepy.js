const { exec } = require("child_process");
const path = require("path");
const { resolve } = require("path");
const fs = require('fs');
const { error } = require("console");
const { stdout } = require("process");

const outputPath = path.join(__dirname,"outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive: true});
}


const executePy = (filepath,inPath) =>{
    return new Promise((resolve,reject) =>{
        exec(`python ${filepath} <${inPath}`,
        (error, stdout,stderr) => {
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
}

module.exports ={
    executePy
}