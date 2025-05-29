const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(' Conectado a la base de datos');
})
.catch((error) => {
  console.error(' Error al conectar a la base de datos:', error);
});

module.exports = mongoose;
