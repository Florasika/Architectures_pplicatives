const { StrategieBronze, StrategieSilver, StrategieGold } = require('../strategies/StrategiePoints');
class StatutVIP {
  constructor(niveau) {
    const niveauxValides = ['BRONZE', 'SILVER', 'GOLD'];

    if (!niveauxValides.includes(niveau)) {
      throw new Error("Statut invalide");
    }

    this.niveau = niveau;
  }

  /*get multiplicateurPoint() {
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
  }*/


  get strategie() {
    switch (this.niveau) {
      case 'GOLD': return new StrategieGold();
      case 'SILVER': return new StrategieSilver();
      default: return new StrategieBronze();
    }
  }
}

module.exports = StatutVIP;