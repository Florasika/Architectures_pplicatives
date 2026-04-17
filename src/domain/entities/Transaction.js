const PointDetail = require('../valueObjects/PointDetail');

class Transaction {
  constructor({ idTransaction, montant, dateAchat, lieu }) {
    this.idTransaction = idTransaction;
    this.montant = montant;
    this.dateAchat = new Date(dateAchat);
    this.lieu = lieu; // CoordonneesGPS
  }

  calculerPoints(statutVIP) {
    const multiplicateur = statutVIP.multiplicateurPoint;

    //const points = Math.floor(this.montant * multiplicateur);
    const points = statutVIP.strategie.calculerPoints(this.montant);

    return [
      new PointDetail({
        valeur: points,
        dateAcquisition: this.dateAchat
      })
    ];
  }

  estRecente(dateActuelle) {
    const maintenant = new Date(dateActuelle);
    const diff = maintenant - this.dateAchat;

    const uneHeure = 60 * 60 * 1000;

    return diff <= uneHeure;
  }
}

module.exports = Transaction;