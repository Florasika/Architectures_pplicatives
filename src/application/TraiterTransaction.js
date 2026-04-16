const FraudeService = require('../domain/services/FraudeService');

function traiterTransaction(client, transaction) {
  // 1. Ajouter la transaction
  client.ajouterTransaction(transaction);

  // 2. Vérifier la fraude
  if (FraudeService.detecterFraude(client.transactions)) {
    client.gelerCompte();
  }

  return client;
}

module.exports = traiterTransaction;