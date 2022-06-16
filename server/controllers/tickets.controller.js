'use strict'


const { generarJWT } = require('../helpers/JWT');
const moment = require('moment')
const config = require('../config/general');

const User = require("../models/usuario.model")

const Tickets = require("../models/tickets.model")

const crearDestinatario = async (req, res) => {
    await console.log("get tipo de cuenta controlador", req.user);
    var { banco, correo, nombre, nroCuenta, rut, telefono, tipoCuenta } = req.body;
    rut = rut.replace("-", "");
    rut = rut.replace(/\./g, "");
    let dv = rut[rut.length - 1];
    rut = rut.slice(0, -1);

    const des = { rut: rut, dv: dv, banco: banco, correo: correo, nombre: nombre, nroCuenta: nroCuenta, telefono: telefono, tipoCuenta: tipoCuenta }

    try {
        var user = await User.findById(req.user.id);
        user.destinatarios.push(des);
        user = await user.save();
        if (!user) return res.send({ success: false, msg: "Ha ocurrido un problema al crear el destinatario" })
        return res.send({ success: true })
    } catch (error) {
        console.log(error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al buscar los tipos de cuentas bancarias" })
    }
}

const getTickets = async (req, res) => {
    console.log('get Tickets', getTickets)
    try {
        var ticket = await Tickets.find({});
        console.log('ticket', ticket)
        if (!user || user.destinatarios.length < 0) return res.send({ success: false, msg: "No tiene Tickets" })
        return res.send({ success: true, data: user.destinatarios })
    } catch (error) {
        await console.log("error", error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al buscar los tickets" })
    }
}



module.exports = {
    getTickets
}