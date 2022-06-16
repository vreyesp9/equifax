'use strict'


const usuarios = require('../models/usuario.model');
const { generarJWT } = require('../helpers/JWT');
const moment = require('moment')
const config = require('../config/general');
const TipoCuentas = require("../models/tipoCuentas.model")
const User = require("../models/usuario.model")
const Cuenta = require("../models/cuenta.model")
const Transferencia = require("../models/transferencia.model")

const getTipoCuenta = async(req, res) => {
    await console.log("get tipo de cuenta controlador");
    try {
        const cuentas = await TipoCuentas.find({});
        await console.log("cuentas", cuentas);
        if (!cuentas) return res.send({ success: false, msg: "Ha ocurrido un problema al buscar los tipos de cuentas bancarias" })
        return res.send({ success: true, data: cuentas })
    } catch (error) {
        return res.send({ success: false, msg: "Ha ocurrido un problema al buscar los tipos de cuentas bancarias" })
    }
}

const crearDestinatario = async(req, res) => {
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

const listDestinatario = async(req, res) => {
    try {
        var user = await User.findById(req.user.id);
        if (!user || user.destinatarios.length < 0) return res.send({ success: false, msg: "No tiene destinatarios" })
        return res.send({ success: true, data: user.destinatarios })
    } catch (error) {
        await console.log("error", error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al buscar los destinatarios" })
    }
}

const crearCuentaTipo = () => {
    const cuentas = new TipoCuentas
    cuentas.save();
    cuentas.nombreTipo = "victor banco"
    cuentas.idTipo = 1121
}

const tranferir = async(req, res) => {
    try {
        var { banco, correo, dv, id, name, nombre, nroCuenta, rut, telefono, tipoCuenta, montotran } = req.body;
        const userID = req.user.id;
        const usuarioEmisor = await User.findById(userID);
        if (!montotran) return res.send({ success: false, msg: "Monto de transferencia debe ser mayor a 0" })
        if (!usuarioEmisor) return res.send({ success: false, msg: "Usuario no existe" })
        var cuenta = await Cuenta.findOne({ rut: usuarioEmisor.rut })
        if (!cuenta) return res.send({ success: false, msg: "Cuenta no existe" })
        cuenta.monto = cuenta.monto - montotran;
        await cuenta.save()

        var transferencia = new Transferencia();
        transferencia.rutEmisor = usuarioEmisor.rut
        transferencia.dvEmisor = usuarioEmisor.dv
        transferencia.bancoEmisor = cuenta.banco
        transferencia.tipoCuentaEmisor = cuenta.tipoCuenta
        transferencia.fechaTransaccion = moment().format("DD/MM/YYYY");
        transferencia.nombreReceptor = nombre
        transferencia.rutReceptor = rut
        transferencia.correoReceptor = correo
        transferencia.idTransac = new Date().getTime()
        transferencia.monto = montotran
        transferencia.bancoReceptor = banco
        transferencia.tipoCuentaReceptor = tipoCuenta
        transferencia.dvReceptor = dv

        await transferencia.save();

        var cuentareceptor = await Cuenta.findOne({ rut: rut });
        cuentareceptor.monto = cuentareceptor.monto + montotran;
        await cuentareceptor.save();
        return res.send({ success: true, msg: "Todo ok" })
    } catch (error) {
        console.log(error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al transferir" })
    }
}

const historial = async(req, res) => {
    try {
        const historial = await Transferencia.find({ rutEmisor: req.user.rut });
        if (!historial) return res.send({ success: false, msg: "No hay transferencias" })
        return res.send({ success: true, data: historial })
    } catch (error) {
        console.log(error);
        return res.send({ success: false, msg: "Ha ocurrido un problema al transferir" })
    }
}


module.exports = {
    getTipoCuenta,
    crearDestinatario,
    listDestinatario,
    tranferir,
    historial
}