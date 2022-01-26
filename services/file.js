var toolboxSecretApi = require('../http/toolboxSecretApi');
// App Modules
const File = require("../models/file");
const Line = require("../models/line");

exports.findAll = async function(req, res, next) {
    try {
        const response = await toolboxSecretApi.getFiles();
        if (!response) {
            next("ERROR");
            return;
        }
        const result = await processFiles(response.files);
        res.json(result);
    } catch(ex){
        next(ex);
    };
};

async function processFiles(files) {
    const result = [];
    for (let idx=0; idx<files.length; idx++) {
        try {
            const fileCsv = await toolboxSecretApi.getFileCsv(files[idx]);
            const fileLines = fileCsv.split("\n");
            const fileHeader = fileLines[0].split(",");
            const valid = fileHeader.length == 4
                            fileHeader[0].trim().toLowerCase() == "file" &&
                            fileHeader[1].trim().toLowerCase() == "text" &&
                            fileHeader[2].trim().toLowerCase() == "number" &&
                            fileHeader[3].trim().toLowerCase() == "hex" &&
                            fileLines.length > 1;
            if (!valid) continue;
            result.push(buildJsonResult(files[idx], fileHeader, fileLines));
        }
        catch(ex) {
            console.log("ERROR download file", files[idx]);
        }
    }
    return result;
}

function buildJsonResult(fileName, fileHeader, fileLines) {
    const lines = [];
    for(let i=1; i<fileLines.length; i++) {
        const fileLine = fileLines[i].split(",");
        if (fileHeader.length != fileLine.length || isNaN(fileLine[2].trim()) || fileLine[3].trim().length != 32) continue;
        lines.push(new Line(fileLine[1], fileLine[2], fileLine[3]));
    }
    return new File(fileName, lines);
}