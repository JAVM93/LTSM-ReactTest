import mongoose from "mongoose";

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

const Report = mongoose.model('Reporte', reporteSchema);

export default Report;

