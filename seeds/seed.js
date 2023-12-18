// const mongoose = require('mongoose');
// const HistoricalEvent = require('../models/HistoricalEvent.model'); 

// const databaseURL = "mongodb://127.0.0.1:27017/project-2";

// // Conecta con MongoDB
// mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });

// // Manejo de errores de conexión
// mongoose.connection.on('error', (err) => {
//     console.error('Error de conexión a MongoDB:', err);
// });

// // Define Datos de Prueba
// const historicalEventsData = [
//     {
//         title: "Descubrimiento de América",
//         date: new Date('1492-10-12'),
//         location: 'America',
//         description: 'Cristóbal Colón llega a africa',
//         links: ['https://en.wikipedia.org/wiki/Christopher_Columbus'],
//         image: 'https://example.com/columbus.jpg',
//         notableCharacters: ["Cristóbal Colón"],
//         creator: mongoose.Types.ObjectId("657a0cdb62908b2ed0ba2aa4"),
        
//     },
    
// ];

// // Función para sembrar datos en la base de datos
// const seedDatabase = () => {
//     return Promise.resolve()
//         .then(() => {
//             // Borra todos los eventos existentes antes de sembrar nuevos datos
//             return HistoricalEvent.deleteMany();
//         })
//         .then(() => {
//             // Inserta los nuevos datos
//             return HistoricalEvent.insertMany(historicalEventsData);
//         })
//         .then(() => {
//             console.log('Datos sembrados con éxito');
//         })
//         .catch((error) => {
//             console.error('Error al sembrar datos:', error);
//         })
//         .finally(() => {
//             // Desconecta de la base de datos al finalizar
//             mongoose.disconnect();
//         });
// };

// // Ejecuta el script
// seedDatabase()
//     .then(() => {
//         console.log('Script de semillas completado');
//     })
//     .catch((error) => {
//         console.error('Error en el script de semillas:', error);
//     });
