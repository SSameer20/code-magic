const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);
  
  return new Promise((resolve, reject) => {
    try {
      exec(
        `g++ ${filepath} -o ${outPath} && ${outPath} <${inPath}`,
        (error, stdout, stderr) => {
          try {
            if (error) {
              throw { error, stderr };
            }
            if (stderr) {
              throw stderr;
            }
            resolve(stdout);
          } catch (err) {
            reject(err);
          }
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};

module.exports = {
  executeCpp,
};
