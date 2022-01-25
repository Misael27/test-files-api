"use strict";

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
class File {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

module.exports = File;


