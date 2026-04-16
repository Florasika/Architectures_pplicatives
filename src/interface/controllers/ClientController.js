const traiterTransaction = require('../../application/TraiterTransaction');
const CompteClient = require('../../domain/entities/CompteClient');
const Transaction = require('../../domain/entities/Transaction');
const StatutVIP = require('../../domain/valueObjects/StatutVIP');
const CoordonneesGPS = require('../../domain/valueObjects/CoordonneesGPS');
const path = require('path');
const PATH = path.join(__dirname, '../../data/clients.json');

// Fake DB (temporaire)
const clientRepository = require('../../infrastructure/repositories/ClientRepository');

function creerClient(req, res) {
  try {
    const { idClient, nom } = req.body;

    const client = new CompteClient({
      idClient,
      nom,
      statutActuel: new StatutVIP('BRONZE')
    });

    clientRepository.save(client);

    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function ajouterTransaction(req, res) {
  try {
    const { idClient } = req.params;
    const { montant, latitude, longitude } = req.body;

    const client = clientRepository.findById(idClient);

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
    clientRepository.save(client);

    res.json({
      message: "Transaction ajoutée",
      estGele: client.estGele
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function getClient(req, res) {
  const { idClient } = req.params;

  const client = clientRepository.findById(idClient);

  if (!client) {
    return res.status(404).json({ error: "Client non trouvé" });
  }

  res.json(client);
}

module.exports = {
  creerClient,
  ajouterTransaction,
  getClient
};