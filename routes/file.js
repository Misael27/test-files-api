var express = require('express')
var router = express.Router()
var fileService = require('../services/file')
// App Modules

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: files management
 */

/**
 * @swagger
 * /files/data:
 *   get:
 *     summary: Returns format files.
 *     tags: [Files]
 *     description: list of files.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *         type: string
 *         required: false
 *         description: name of specific file
 *     responses:
 *       '200':
 *         description: Operation was successful.
 *         schema:
 *           $ref: '#/components/schemas/File'
 *       '500':
 *         description: Server error
*/
router.get('/data', fileService.getData)

/**
 * @swagger
 * /files/list:
 *   get:
 *     summary: list of file names
 *     tags: [Files]
 *     description: list of file names
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Operation was successful.
 *         schema:
 *           $ref: '#/components/schemas/File'
 *       '500':
 *         description: Server error
*/
router.get('/list', fileService.getList)

module.exports = router

/**
 * @swagger
 *  components:
 *    schemas:
 *      Line:
 *        type: object
 *        properties:
 *          text:
 *            type: string
 *          number:
 *            type: integer
 *          hex:
 *            type: string
 *        example:
 *           text: "RgTya"
 *           number: 64075909
 *           hex: "70ad29aacf0b690b0467fe2b2767f765"
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      File:
 *        type: object
 *        properties:
 *          file:
 *            type: string
 *          lines:
 *            type:
 *              $ref: '#/components/schemas/Line'
 *        example:
 *           name: "file1.csv"
 *           lines: []
 */
