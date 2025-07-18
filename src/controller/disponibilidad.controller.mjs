import disponibilidadModel from "../schemas/disponibilidad.schemas.mjs";
import userModel from "../schemas/User.schema.mjs";
import mongoose from "mongoose";

function isValidObjectId(id) {
    return typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/);
}

// Crear disponibilidad
const createDisponibilidad = async (req, res) => {
    const { dentist, diaSemana, horaInicio, horaFin, activo, bloquesDisponibles } = req.body;

    console.log('Body completo recibido:', req.body);
    console.log('Bloques disponibles:', bloquesDisponibles);

    try {
        let odontologo;
        if (isValidObjectId(dentist)) {
            odontologo = await userModel.findOne({ _id: dentist, role: 'dentist' });
        } else {
            odontologo = await userModel.findOne({ cedula: dentist, role: 'dentist' });
        }
        if (!odontologo) {
            return res.status(400).json({ msg: "Odontólogo no válido o no encontrado." });
        }

        // Validar si ya existe disponibilidad para ese odontólogo, día y bloque
        const disponibilidadExistente = await disponibilidadModel.findOne({ dentist, diaSemana, horaInicio, activo });
        if (disponibilidadExistente) {
            return res.status(400).json({ msg: "Ya existe esta disponibilidad para el odontólogo." });
        }

        const nuevaDisponibilidad = await disponibilidadModel.create({ dentist, diaSemana, horaInicio, horaFin, activo, bloquesDisponibles });
        res.status(201).json(nuevaDisponibilidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear disponibilidad." });
    }
};

// Obtener todas las disponibilidades
const getAllDisponibilidad = async (req, res) => {
  try {
    // Si no hay parámetros, devolver todas las disponibilidades
    if (!req.query.dentist && !req.query.date && !req.query.diaSemana) {
      const todasDisponibilidades = await disponibilidadModel.find({}).populate('dentist');
      console.log('Todas las disponibilidades:', todasDisponibilidades);
      res.json(todasDisponibilidades);
      return;
    }
    
    // Si hay parámetros, buscar por filtros específicos
    const { dentist, date, diaSemana } = req.query;
    
    console.log('Backend - Query recibido:', { dentist, date, diaSemana });
    
    const disponibilidad = await disponibilidadModel.findOne({
      dentist: dentist,
      diaSemana: diaSemana
    });
    
    console.log('Backend - Disponibilidad encontrada:', disponibilidad);
    
    res.json(disponibilidad ? [disponibilidad] : []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar disponibilidad por ID
const updateDisponibilidadById = async (req, res) => {
    const disponibilidadId = req.params.id;
    const inputData = req.body;

    try {
        const updatedDisponibilidad = await disponibilidadModel.findByIdAndUpdate(disponibilidadId, inputData, { new: true });
        if (!updatedDisponibilidad) {
            return res.status(404).json({ msg: 'Disponibilidad no encontrada para actualizar.' });
        }
        res.json(updatedDisponibilidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la disponibilidad." });
    }
};

// Eliminar disponibilidad por ID (opcional)
const deleteDisponibilidadById = async (req, res) => {
    const disponibilidadId = req.params.id;

    try {
        const deleted = await disponibilidadModel.findByIdAndDelete(disponibilidadId);
        if (!deleted) {
            return res.status(404).json({ msg: 'Disponibilidad no encontrada para eliminar.' });
        }
        res.json({ msg: 'Disponibilidad eliminada correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la disponibilidad." });
    }
};

export {
    createDisponibilidad,
    getAllDisponibilidad,
    updateDisponibilidadById,
    deleteDisponibilidadById
};