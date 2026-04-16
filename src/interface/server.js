const express = require('express');
const clientRoutes = require('./routes/clientRoutes');


const app = express();
app.use(express.json());

app.use('/api', clientRoutes);
app.get('/', (req, res) => {
  res.send('API Fidélité OK');
});

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});