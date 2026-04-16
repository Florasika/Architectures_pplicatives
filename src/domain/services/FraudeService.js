
class FraudeService {
  static detecterFraude(transactions) {
    // Trier par date
    /*const sorted = transactions.sort(
      (a, b) => a.dateAchat - b.dateAchat
    );*/
    const sorted = [...transactions].sort((a, b) => a.dateAchat - b.dateAchat);

    const uneHeure = 60 * 60 * 1000;

    for (let i = 0; i < sorted.length; i++) {
      let groupe = [sorted[i]];

      for (let j = i + 1; j < sorted.length; j++) {
        const diff = sorted[j].dateAchat - sorted[i].dateAchat;

        if (diff <= uneHeure) {
          groupe.push(sorted[j]);
        } else {
          break;
        }
      }

      // Condition fraude
      if (groupe.length > 5) {
        if (this.lieuxEloignes(groupe)) {
          return true;
        }
      }
    }

    return false;
  }

  static lieuxEloignes(transactions) {
    const seuilDistance = 50;

    for (let i = 0; i < transactions.length; i++) {
      for (let j = i + 1; j < transactions.length; j++) {
        // La logique de distance appartient au Value Object
        const d = transactions[i].lieu.distanceVers(transactions[j].lieu);
        if (d > seuilDistance) return true;
      }
    }
    return false;
  }



}

module.exports = FraudeService;