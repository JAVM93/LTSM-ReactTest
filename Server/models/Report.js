/**
 * @fileoverview Defines the Report model for MongoDB using Mongoose.
 * @module models/Report
 */

import mongoose from "mongoose";

/**
 * Represents a report.
 * @typedef {Object} Report
 * @property {string} userId - The ID of the user who created the report.
 * @property {Date} fecha - The date of the report.
 * @property {string} personaQueReporta - The person who reported the issue.
 * @property {string} sitio - The location where the issue occurred.
 * @property {string} problema - The problem description.
 * @property {string} descripcionDelProblema - The detailed description of the problem.
 * @property {string} personaAsignada - The person assigned to solve the issue.
 * @property {boolean} solucionado - Indicates if the issue has been solved.
 * @property {string} descripcionDeLaSolucion - The description of the solution (required if solucionado is true).
 * @property {Date} fechaDeLaSolucion - The date when the issue was solved (required if solucionado is true).
 */

const reporteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true
  },
  personaQueReporta: {
    type: String,
    required: true
  },
  sitio: {
    type: String,
    required: true
  },
  problema: {
    type: String,
    required: true
  },
  descripcionDelProblema: {
    type: String,
    required: true
  },
  personaAsignada: {
    type: String,
    required: true
  },
  solucionado: {
    type: Boolean,
    required: false
  },
  descripcionDeLaSolucion: {
    type: String,
    required: function() {
      return this.solucionado;
    }
  },
  fechaDeLaSolucion: {
    type: Date,
    required: function() {
      return this.solucionado;
    }
  }
});

/**
 * Mongoose model for the Report collection.
 * @type {import("mongoose").Model<Report>}
 */
const Report = mongoose.model('Reporte', reporteSchema);

export default Report;

