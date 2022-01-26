var toolboxSecretApi = require('../http/toolboxSecretApi')
// App Modules
const File = require('../models/file')
const Line = require('../models/line')

exports.getList = async function (req, res, next) {
  try {
    res.json(await getFiles())
  } catch (ex) {
    next(ex)
  };
}

exports.getData = async function (req, res, next) {
  try {
    const fileName = req.query.fileName
    let fileNames = [fileName]
    if (!fileName) {
      fileNames = await getFiles()
    }
    const result = await processFiles(fileNames)
    res.json(result)
  } catch (ex) {
    next(ex)
  };
}

async function getFiles () {
  const response = await toolboxSecretApi.getFiles()
  if (!response) {
    throw new Error('api external error')
  }
  return response.files
}

async function processFiles (fileNames) {
  const result = []
  for (let idx = 0; idx < fileNames.length; idx++) {
    try {
      const fileCsv = await toolboxSecretApi.getFileCsv(fileNames[idx])
      const fileLines = fileCsv.split('\n')
      const fileHeader = fileLines[0].split(',')
      const valid = fileHeader.length === 4 &&
                    fileHeader[0].trim().toLowerCase() === 'file' &&
                    fileHeader[1].trim().toLowerCase() === 'text' &&
                    fileHeader[2].trim().toLowerCase() === 'number' &&
                    fileHeader[3].trim().toLowerCase() === 'hex' &&
                    fileLines.length > 1
      if (!valid) continue
      result.push(buildJsonResult(fileNames[idx], fileHeader, fileLines))
    } catch (ex) {
      console.log('ERROR download file', fileNames[idx])
    }
  }
  return result
}

function buildJsonResult (fileName, fileHeader, fileLines) {
  const lines = []
  for (let i = 1; i < fileLines.length; i++) {
    const fileLine = fileLines[i].split(',')
    if (fileHeader.length !== fileLine.length || isNaN(fileLine[2].trim()) || fileLine[3].trim().length !== 32) continue
    lines.push(new Line(fileLine[1], parseFloat(fileLine[2]), fileLine[3]))
  }
  return new File(fileName, lines)
}
