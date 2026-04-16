const StatutVIP = require('../valueObjects/StatutVIP');

class StatutService {

  static calculerStatut(transactions, dateActuelle) {
    const transactionsRecentes = this._filtrerTransactionsRecentes(
      transactions,
      dateActuelle
    );

    const totalDepense = this._calculerTotal(transactionsRecentes);

    return this._determinerStatut(totalDepense);
  }

  static _filtrerTransactionsRecentes(transactions, dateActuelle) {
    const maintenant = new Date(dateActuelle);
    const unAnEnArriere = new Date(maintenant);
    unAnEnArriere.setFullYear(unAnEnArriere.getFullYear() - 1);

    return transactions.filter(t =>
      t.dateAchat >= unAnEnArriere &&
      t.dateAchat <= maintenant
    );
  }

  static _calculerTotal(transactions) {
    return transactions.reduce((sum, t) => sum + t.montant, 0);
  }

  static _determinerStatut(total) {
    const GOLD = 2000;
    const SILVER = 1000;

    if (total >= GOLD) return new StatutVIP('GOLD');
    if (total >= SILVER) return new StatutVIP('SILVER');
    return new StatutVIP('BRONZE');
  }
}

module.exports = StatutService;