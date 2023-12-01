const Reporte = require('./models/User');

// Actualizar todos los documentos en la colección
Reporte.updateMany({}, { $set: { position: 'valor' } }, function(err, res) {
  if (err) throw err;
  console.log(res);
});