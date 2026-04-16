const traiterTransaction = require('../../application/TraiterTransaction');
const CompteClient = require('../../domain/entities/CompteClient');
const Transaction = require('../../domain/entities/Transaction');
const StatutVIP = require('../../domain/valueObjects/StatutVIP');
const CoordonneesGPS = require('../../domain/valueObjects/CoordonneesGPS');

// Fake DB (temporaire)
const clients = [];

function creerClient(req, res) {
  try {
    const { idClient, nom } = req.body;

    const client = new CompteClient({
      idClient,
      nom,
      statutActuel: new StatutVIP('BRONZE')
    });

    clients.push(client);

    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function ajouterTransaction(req, res) {
  try {
    const { idClient } = req.params;
    const { montant, latitude, longitude } = req.body;

    const client = clients.find(c => c.idClient == idClient);

    if (!client) {
      return res.status(404).json({ error: "Client non trouvé" });
    }

    const transaction = new Transaction({
      idTransaction: Date.now(),
      montant,
      dateAchat: new Date(),
      lieu: new CoordonneesGPS(latitude, longitude)
    });

    traiterTransaction(client, transaction);

    res.json({
      message: "Transaction ajoutée",
      estGele: client.estGele
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  creerClient,
  ajouterTransaction
};