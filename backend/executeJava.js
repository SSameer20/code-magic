const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath,inPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const javaCodeDir = path.join(__dirname, 'codes', 'javacodes', jobId);
  const javaCode = path.join(javaCodeDir, 'Solution.java');

  if (!fs.existsSync(javaCodeDir)) {
    fs.mkdirSync(javaCodeDir, { recursive: true });
  }

  if (!fs.existsSync(filepath)) {
    return Promise.reject("Source file does not exist.");
  }

  fs.copyFileSync(filepath, javaCode);

  return new Promise((resolve, reject) => {
    try {
      exec(
        `javac ${javaCode} && java -cp ${javaCodeDir} Solution <${inPath}`,
        (error, stdout, stderr) => {
          try {
            if (error) {
              throw { error, stderr };
            }
            if (stderr) {
              throw stderr;
            }
            const outPath = path.join(javaCodeDir, 'Solution.out');
            fs.writeFile(outPath, stdout, (writeErr) => {
              if (writeErr) {
                reject(writeErr);
              } else {
                resolve(stdout);
              }
            });
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
  executeJava,
};
