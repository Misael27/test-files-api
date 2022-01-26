"use strict";

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
class File {
  constructor(file, lines) {
    this.file = file;
    this.lines = lines;
  }
}

module.exports = File;


