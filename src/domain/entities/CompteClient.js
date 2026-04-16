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

    // Générer des points à partir de la transaction
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

    // On reconstruit le tableau de points plutôt que de muter
    const nouveauxPoints = [...this.points];
    for (let point of pointsValides) {
      if (pointsRestants <= 0) break;
      const idx = nouveauxPoints.indexOf(point);
      if (point.valeur <= pointsRestants) {
        pointsRestants -= point.valeur;
        nouveauxPoints.splice(idx, 1); // supprime le point épuisé
      } else {
        // Remplace par un nouveau PointDetail avec la valeur réduite
        nouveauxPoints[idx] = new PointDetail({
          valeur: point.valeur - pointsRestants,
          dateAcquisition: point.dateAcquisition
        });
        pointsRestants = 0;
      }
    }
    this.points = nouveauxPoints;
  }

  gelerCompte() {
    this.estGele = true;
  }
}

module.exports = CompteClient;