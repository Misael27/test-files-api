var express = require('express');
var router = express.Router();
var  fileService = require('../services/file');
// App Modules


/**
 * @swagger
 * tags:
 *   name: Files
 *   description: files management
 */

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Returns monitoring data.
 *     tags: [Files]
 *     description: Retrieve a list of files.
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
router.get("/", fileService.findAll);

module.exports = router;

/**
 * @swagger
 *  components:
 *    schemas:
 *      File:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *        example:
 *           name: string
 *           description: string
 */
