import mongoose from "mongoose";
// define una funcion asincrona para definir la configuracion del ODM Mongoose para usar MongoDB
async function dbConnect() {
    try {
            //! POR FAVOR DEFINIR CUALES SON LOS NOMBRES QUE VAMOS A USAR PARA EL STRING DE LA BASE DE DATOS( DB_URL_LOCAL )
        await mongoose.connect(process.env.DB_URL_LOCAL ??"mongodb://localhost:27017/db-dentisapp", {}); // conectamis la base de datos y retorna la promesa

        console.log('Base de datos conectada correctamente')
            // await mongoose.connect(process.env.URL_MODELO_MONGO ??"mongodb://localhost:27017/db-dentisapp", {}); // conectamis la base de datos y retorna la promesa
            // console.log('Base de datos conectada correctamente')
    } catch (error) {
        console.log(error);
        console.error('Error al conectarse a la base de datos')
    }

}

// mongoose.connect('mongodb://127.0.0.51:27017/db-dentisapp')
//     .then(() => {console.log('Conected!')})
//     .catch(()=> {
//         console.log('Error')
//     });

export default dbConnect;