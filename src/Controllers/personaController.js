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
        persona.n_documento = params.n_documento; 

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
            const personas = await Persona.find(); 

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
    },

    getPersonaId: async (req, res) => {
        var personaId = req.params.id; 

        if (!personaId) {
            return res.status(404).send({
                status: 'Error',
                message: 'No se ha especificado el ID de la persona.'
            });
        }

        try {
            const persona = await Persona.findById(personaId); 

            if (!persona) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se encontró la persona con el ID especificado.'
                });
            }

            return res.status(200).send({
                status: 'success',
                persona
            });
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al extraer la persona',
                error: err
            });
        }
    },

     updatePersona: async (req, res) => {
        var personaId = req.params.id;
        var update = req.body; 

        if (!personaId) {
            return res.status(404).send({
                status: 'Error',
                message: 'No se ha especificado el ID de la persona para actualizar.'
            });
        }

        try {
            const personaUpdated = await Persona.findByIdAndUpdate(personaId, update, { new: true });

            if (!personaUpdated) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se encontró la persona para actualizar.'
                });
            }

            return res.status(200).send({
                status: 'success',
                persona: personaUpdated
            });
        } catch (err) {
            if (err.code === 11000) { 
                return res.status(400).send({
                    status: 'Error',
                    message: 'El número de documento ya existe. Por favor, use uno diferente.'
                });
            }
            return res.status(500).send({
                status: 'Error',
                message: 'Error al actualizar la persona',
                error: err
            });
        }
    },

     deletePersona: async (req, res) => {
        var personaId = req.params.id;

        if (!personaId) {
            return res.status(404).send({
                status: 'Error',
                message: 'No se ha especificado el ID de la persona para eliminar.'
            });
        }

        try {
            const personaRemoved = await Persona.findByIdAndDelete(personaId);

            if (!personaRemoved) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se encontró la persona para eliminar.'
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Persona eliminada correctamente',
                persona: personaRemoved
            });
        } catch (err) {
            console.error("ERROR EN EL BACKEND AL ELIMINAR PERSONA:", err); 
            
            return res.status(500).send({
                status: 'Error',
                message: 'Error al eliminar la persona',
                error: err
            });
        }
    }

}

module.exports = controller;