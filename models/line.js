"use strict";

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
class Line {
  constructor(text, number, hex) {
    this.text = text;
    this.number = number;
    this.hex = hex;
  }
}

module.exports = Line;