const { Router } = require('express');
const app = Router();
const transferenciasController = require("../controllers/transferencias.controller")
const auth = require("../middlewares/authenticate")

app.get('/list/cuentas', transferenciasController.getTipoCuenta);
app.post('/nuevo/destinatario', auth.ensureAuth, transferenciasController.crearDestinatario);
app.get('/list/destinatarios', auth.ensureAuth, transferenciasController.listDestinatario);
app.post('/transferir', auth.ensureAuth, transferenciasController.tranferir);
app.get('/historial', auth.ensureAuth, transferenciasController.historial);

module.exports = app;