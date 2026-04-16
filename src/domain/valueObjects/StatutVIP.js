class StatutVIP {
  constructor(niveau) {
    const niveauxValides = ['BRONZE', 'SILVER', 'GOLD'];

    if (!niveauxValides.includes(niveau)) {
      throw new Error("Statut invalide");
    }

    this.niveau = niveau;
  }

  get multiplicateurPoint() {
    switch (this.niveau) {
      case 'BRONZE':
        return 1;
      case 'SILVER':
        return 2;
      case 'GOLD':
        return 3;
      default:
        return 1;
    }
  }
}

module.exports = StatutVIP;