class Recompense {
  constructor({ idRecompense, nom, coutEnPoints, statutRequis }) {
    if (coutEnPoints <= 0) throw new Error("Le coût doit être positif");

    this.idRecompense = idRecompense;
    this.nom = nom;
    this.coutEnPoints = coutEnPoints;
    this.statutRequis = statutRequis; // ex: 'BRONZE', 'SILVER', 'GOLD'
  }

  // Règle métier : un client peut-il débloquer cette récompense ?
  estAccessiblePour(compteClient, dateActuelle) {
    const niveaux = ['BRONZE', 'SILVER', 'GOLD'];
    const niveauClient = niveaux.indexOf(compteClient.statutActuel.niveau);
    const niveauRequis = niveaux.indexOf(this.statutRequis);

    const aLeNiveau = niveauClient >= niveauRequis;
    const aLesPoints = compteClient.getPointsDisponibles(dateActuelle) >= this.coutEnPoints;

    return aLeNiveau && aLesPoints;
  }
}

module.exports = Recompense;