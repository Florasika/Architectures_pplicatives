const StatutService = require('../src/domain/services/StatutService');

describe("StatutService", () => {

  test("doit retourner GOLD si dépenses > 2000", () => {
    const transactions = [
      { montant: 1500, dateAchat: new Date() },
      { montant: 600, dateAchat: new Date() }
    ];

    const resultat = StatutService.calculerStatut(
      transactions,
      new Date()
    );

    expect(resultat.niveau).toBe("GOLD");
  });


  test("doit retourner SILVER si dépenses > 1000", () => {
    const transactions = [
      { montant: 700, dateAchat: new Date() },
      { montant: 400, dateAchat: new Date() }
    ];

    const resultat = StatutService.calculerStatut(
      transactions,
      new Date()
    );

    expect(resultat.niveau).toBe("SILVER");
  });


  test("doit retourner BRONZE si dépenses < 1000", () => {
    const transactions = [
      { montant: 300, dateAchat: new Date() },
      { montant: 200, dateAchat: new Date() }
    ];

    const resultat = StatutService.calculerStatut(
      transactions,
      new Date()
    );

    expect(resultat.niveau).toBe("BRONZE");
  });


  test("doit ignorer les transactions de plus de 12 mois", () => {
    const vieilleDate = new Date();
    vieilleDate.setFullYear(vieilleDate.getFullYear() - 2);

    const transactions = [
      { montant: 3000, dateAchat: vieilleDate }
    ];

    const resultat = StatutService.calculerStatut(
      transactions,
      new Date()
    );

    expect(resultat.niveau).toBe("BRONZE");
  });


  test("doit retourner SILVER pour exactement 1000", () => {
    const transactions = [
      { montant: 1000, dateAchat: new Date() }
    ];

    const resultat = StatutService.calculerStatut(
      transactions,
      new Date()
    );

    expect(resultat.niveau).toBe("SILVER");
  });


  test("doit retourner GOLD pour exactement 2000", () => {
    const transactions = [
      { montant: 2000, dateAchat: new Date() }
    ];

    const resultat = StatutService.calculerStatut(
      transactions,
      new Date()
    );

    expect(resultat.niveau).toBe("GOLD");
  });

});