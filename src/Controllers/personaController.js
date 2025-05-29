'use strict'

var Persona = require('../Models/personaModel');

var controller = {
    savePersona: async (req, res) => {
        var params = req.body;
        var persona = new Persona();

        persona.primer_nombre = params.primer_nombre;
        persona.segundo_nombre = params.segundo_nombre;
        persona.primer_apellido = params.primer_apellido;
        persona.segundo_apellido = params.segundo_apellido;
        persona.n_documento = params.n_documento; // ✅ FALTA ESTO

        try {
            const personaStored = await persona.save(); 
            return res.status(200).send({ 
                status: 'success',
                personaStored 
            });
        } catch (err) {
            return res.status(500).send({ 
                status: "Error",
                message: "Error al guardar persona",
                error: err 
            });
        }
    },

    getPersonas: async (req, res) => {
        try {
            const personas = await Persona.find(); // Obtener todas las personas

            if (!personas || personas.length === 0) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay personas para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                personas
            });
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al extraer los datos',
                error: err
            });
        }
    }

}

module.exports = controller;