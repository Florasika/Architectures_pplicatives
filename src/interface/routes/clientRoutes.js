const express = require('express');
const router = express.Router();
console.log("ROUTES CHARGÉES");

const {
  creerClient,
  ajouterTransaction,
  getClient
} = require('./controllers/clientController');

router.post('/clients', creerClient);
router.post('/clients/:idClient/transactions', ajouterTransaction);
router.get('/clients/:idClient', getClient);

module.exports = router;