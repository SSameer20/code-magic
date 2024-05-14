const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executepy');
const { executeJava } = require('./executeJava');
const { executeC } = require('./executeC');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
require('dotenv').config();

const inputPath = path.join(__dirname,"inputs");


if (!fs.existsSync(inputPath)) {
  fs.mkdirSync(inputPath,{recursive: true});
}

app.use(cors({
    origin: 'http://localhost:3000'
  }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ hello: "world" });
});

app.post('/run', async (req, res) => {
    const { language = "cpp", code, input } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code not allowed" });
    }

    try {
        const filepath = await generateFile(language, code);

        const jobId = path.basename(filepath).split(".")[0];
        const inPath = path.join(inputPath,`${jobId}.txt`);
        await fs.writeFileSync(inPath,input);

        if (language === 'cpp') {
            const output = await executeCpp(filepath,inPath);
            console.log(output);

            return res.json({ filepath, output });
        }
        else if (language === 'python') {
            const output = await executePy(filepath,inPath);

            return res.json({ filepath, output });
        }
        else if (language === 'java') {
            const output = await executeJava(filepath,inPath);
            return res.json({ filepath, output });
        }

        else if(language === 'c'){
            const output = await executeC(filepath,inPath);
            return res.json({filepath,output});
        }
    } catch (error) {
        console.log('Err2:', error);
        return res.status(500).json({ success: false, output: error });
    }
});

app.post('/magic', async (req, res) => {
    const { code, language, type } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code not allowed" });
    }

    try {
        
            const output = await magic(code,language,type);
            console.log(output);

            return res.json({ output });
    } catch (error) {
        console.log('Err2:', error);
        return res.status(500).json({ success: false, output: error });
    }
});

async function magic(code,language, type) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  let prompt = code + 'This is the code given and correct its syntax and program. Find out potential errors and correct them accordingly . Strictly dont provide any kind of extra tokens or text(dont mention the language or provide inverted commas).Just correct the above code and show the whole corrected code.Dont provide any description. if the code has no errors just output the same code. If the code is correct but does not match '+language+' syntax, convert it to '+ language +'and Always remember to write whole code without skips including main function. And include all the libraries in the file without skipping any part of code'
  if(type == "auto"){
    prompt = code + 'This is the code given and try to predict whats happening in the code and autocomplete the code in the'+ language+ 'language'+'.Strictly dont provide any kind of extra tokens or text(dont mention the language or provide inverted commas). Just generate code and show the whole corrected code without any skips. Dont provide any description. If the code looks complete just output the same code'  
  }
  else if(type == "Optimize"){
    prompt = code + 'according to '+language +' on top of code write include the libraries required to run it direclty on compiler without anu edits and all to code without skipping any.Strictly dont provide any kind of extra tokens or text(dont mention the language or provide inverted commas). Just generate code and show the whole corrected code without any skips. Dont provide any description'
  }
  else if(type == "guide_me"){
    prompt = code + 'Add comment to each line of given code, Strictly dont provide any kind of extra tokens or text(dont mention the language name or provide inverted commas).Just give me the code '
  }
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  console.log(text);

  return text;
}

app.listen(5000, () => {
    console.log("Listening at port 5000");
});
