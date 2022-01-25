var toolboxSecretApi = require('../http/toolboxSecretApi');
// App Modules
const File = require("../models/file");



exports.findAll = async function(req, res) {
    const file = new File("hola", "des");
    console.log("ESTO ES UNA PRUEBA",file);
    console.log("FIND ALL");
    const files = await toolboxSecretApi.getFiles();
    res.json({message:'WELCOME API', api_external:files});
};