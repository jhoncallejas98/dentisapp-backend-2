import mongoose from "mongoose";

const formulacionMedicaSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    appointment: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'appointments', 
        required: true 
    },
    dentist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    fecha: { 
        type: Date, 
        required: true 
    },
    medicamento: { 
        type: String, 
        required: [true, "El nombre del medicamento es obligatorio"]
    },
    dosis: { 
        type: String, 
        required: [true, "La dosis es obligatoria"]
    },
    frecuencia: { 
        type: String, 
        required: [true, "La frecuencia es obligatoria"] 
    }, 
    duracionDias: { 
        type: Number, 
        required: [true, "La duración en días es obligatoria"] 
    },
    instrucciones: { 
        type: String 
    }
}, { timestamps: true, versionKey: false });

const formulacionMedicaModel = mongoose.model('formulacionesMedicas', formulacionMedicaSchema);
export default formulacionMedicaModel;