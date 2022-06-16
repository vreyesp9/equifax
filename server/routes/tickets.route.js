'use strict'

const { check } = require('express-validator');
const ticketController = require('../controllers/tickets.controller');
var express = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
var api = express.Router();

// getTicket
api.get('diego', ticketController.getTickets);
module.exports = api;