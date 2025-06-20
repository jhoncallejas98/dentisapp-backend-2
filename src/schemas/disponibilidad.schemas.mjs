import mongoose from "mongoose";

const disponibilidadSchema = new mongoose.Schema({
    dentist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    diaSemana: { 
        type: String,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        required: true
    },
    bloquesDisponibles: [{ 
        type: String,
        enum: [
            '08:00', '08:20', '08:40', '09:00', '09:20', '09:40', '10:00', '10:20', '10:40',
            '11:00', '11:20', '11:40', '12:00', '12:20', '12:40', '13:00', '13:20', '13:40',
            '14:00', '14:20', '14:40', '15:00', '15:20', '15:40', '16:00', '16:20', '16:40',
            '17:00', '17:20', '17:40'
        ]
    }],
    activo: { type: Boolean, default: true }
}, { timestamps: true, versionKey: false });

const disponibilidadModel = mongoose.model('disponibilidades', disponibilidadSchema);
export default disponibilidadModel;