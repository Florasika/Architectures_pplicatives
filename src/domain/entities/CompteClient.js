const PointDetail = require('../valueObjects/PointDetail');

class CompteClient {
  constructor({ idClient, nom, statutActuel, estGele = false }) {
    this.idClient = idClient;
    this.nom = nom;
    this.statutActuel = statutActuel;
    this.estGele = estGele;
    this.transactions = [];
    this.points = [];
  }

  ajouterTransaction(transaction) {
    if (this.estGele) {
      throw new Error("Compte gelé, impossible d'ajouter une transaction");
    }

    this.transactions.push(transaction);

    const pointsGeneres = transaction.calculerPoints(this.statutActuel);
    this.points.push(...pointsGeneres);
  }

  getPointsDisponibles(dateActuelle) {
    return this.points
      .filter(point => point.estValide(dateActuelle))
      .reduce((total, point) => total + point.valeur, 0);
  }

  utiliserPoints(nbPoints, dateActuelle) {
    const pointsDisponibles = this.getPointsDisponibles(dateActuelle);
    if (nbPoints > pointsDisponibles) throw new Error("Pas assez de points");

    let pointsRestants = nbPoints;
    const pointsValides = this.points
      .filter(p => p.estValide(dateActuelle) && p.valeur > 0)
      .sort((a, b) => a.dateAcquisition - b.dateAcquisition);

    const nouveauxPoints = [...this.points];

    for (let point of pointsValides) {
      if (pointsRestants <= 0) break;

      const idx = nouveauxPoints.indexOf(point);
      const resteValeur = point.valeur - pointsRestants;

      if (resteValeur > 0) {
        // Il reste de la valeur dans ce lot : on le remplace par un lot réduit
        nouveauxPoints[idx] = new PointDetail({
          valeur: resteValeur,
          dateAcquisition: point.dateAcquisition
        });
        pointsRestants = 0;
      } else {
        // Le lot est entièrement consommé : on le supprime
        nouveauxPoints.splice(idx, 1);
        pointsRestants -= point.valeur;
      }
    }

    this.points = nouveauxPoints;
  }

  gelerCompte() {
    this.estGele = true;
  }
}

module.exports = CompteClient;