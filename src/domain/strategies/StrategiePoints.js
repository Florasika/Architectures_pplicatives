class StrategieBronze {
  calculerPoints(montant) {
    return Math.floor(montant * 1);
  }
}

class StrategieSilver {
  calculerPoints(montant) {
    return Math.floor(montant * 2);
  }
}

class StrategieGold {
  calculerPoints(montant) {
    return Math.floor(montant * 3);
  }
}

module.exports = { StrategieBronze, StrategieSilver, StrategieGold };