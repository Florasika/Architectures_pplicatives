const { StrategieBronze, StrategieSilver, StrategieGold } = require('../src/domain/strategies/StrategiePoints');
const StatutVIP = require('../src/domain/valueObjects/StatutVIP');

describe("StrategiePoints - Pattern Strategy", () => {

  // --- Tests directs des stratégies ---

  test("StrategieBronze doit multiplier par 1", () => {
    const strategie = new StrategieBronze();
    expect(strategie.calculerPoints(100)).toBe(100);
  });

  test("StrategieSilver doit multiplier par 2", () => {
    const strategie = new StrategieSilver();
    expect(strategie.calculerPoints(100)).toBe(200);
  });

  test("StrategieGold doit multiplier par 3", () => {
    const strategie = new StrategieGold();
    expect(strategie.calculerPoints(100)).toBe(300);
  });

  test("doit arrondir à l'entier inférieur", () => {
    const strategie = new StrategieSilver();
    expect(strategie.calculerPoints(99)).toBe(198); // 99 * 2 = 198, pas 198.xx
  });

  // --- Tests via StatutVIP (intégration Strategy + VIP) ---

  test("StatutVIP GOLD doit retourner la stratégie Gold", () => {
    const statut = new StatutVIP('GOLD');
    expect(statut.strategie.calculerPoints(100)).toBe(300);
  });

  test("StatutVIP SILVER doit retourner la stratégie Silver", () => {
    const statut = new StatutVIP('SILVER');
    expect(statut.strategie.calculerPoints(100)).toBe(200);
  });

  test("StatutVIP BRONZE doit retourner la stratégie Bronze", () => {
    const statut = new StatutVIP('BRONZE');
    expect(statut.strategie.calculerPoints(100)).toBe(100);
  });

  // --- MOCK : vérifie que Transaction délègue bien à la stratégie ---

  test("MOCK - Transaction doit appeler calculerPoints sur la stratégie", () => {
    const Transaction = require('../src/domain/entities/Transaction');
    const CoordonneesGPS = require('../src/domain/valueObjects/CoordonneesGPS');

    // On crée un StatutVIP dont la stratégie est un Mock
    const strategieMock = {
      calculerPoints: jest.fn().mockReturnValue(42)
    };

    const statutMock = {
      strategie: strategieMock
    };

    const transaction = new Transaction({
      idTransaction: 'test-001',
      montant: 150,
      dateAchat: new Date(),
      lieu: new CoordonneesGPS(48.8566, 2.3522)
    });

    transaction.calculerPoints(statutMock);

    // Vérifie que la stratégie a bien été appelée avec le bon montant
    expect(strategieMock.calculerPoints).toHaveBeenCalledWith(150);
    expect(strategieMock.calculerPoints).toHaveBeenCalledTimes(1);
  });

});