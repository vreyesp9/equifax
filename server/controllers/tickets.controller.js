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
        var tickets = await Tickets.find({});
        if (!tickets) return res.send({ success: false, msg: "No tiene Tickets" })
        return res.send({ success: true, data: tickets })
    } catch (error) {
        await console.log("error", error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al buscar los tickets" })
    }
}

const deleteTickets = async (req, res) => {

    try {
        var tickets = await Tickets.deleteOne(req.id)
        if (!tickets) return res.send({ success: false, msg: "Error al eliminar" })
        return res.send({ success: true, data: 'Se elimino Correctamente' })

    } catch (error) {
        await console.log("error", error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al eliminar el ticket" })
    }
}


const updateTickets = async (req, res) => {

    try {
        var tickets = await Tickets.updateOne({ _id: req.id }, {
            id: req.id,
            titulo: req.titulo,
            descripcion: req.descripcion,
            status: req.status,
            ejecutivo: 'victor'
        });
        if (!tickets) return res.send({ success: false, msg: "No se pudo actualizar el  Ticket" })
        return res.send({ success: true, data: 'Ticket actualizado correctamente' })



    } catch (error) {
        await console.log("error", error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al actualizar el ticket" })
    }
}



module.exports = {
    getTickets,
    updateTickets,
    deleteTickets
}