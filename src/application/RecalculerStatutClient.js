const StatutService = require('../domain/services/StatutService');

function recalculerStatutClient(client, dateActuelle) {
  const nouveauStatut = StatutService.calculerStatut(
    client.transactions,
    dateActuelle
  );

  client.statutActuel = nouveauStatut;

  return client;
}

module.exports = recalculerStatutClient;