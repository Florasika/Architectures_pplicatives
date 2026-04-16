const FraudeService = require('../src/domain/services/FraudeService');
const CoordonneesGPS = require('../src/domain/valueObjects/CoordonneesGPS');

test("doit détecter une fraude", () => {
  const transactionsMock = [
    { dateAchat: new Date(), lieu: new CoordonneesGPS(1, 1) },
    { dateAchat: new Date(), lieu: new CoordonneesGPS(50, 50) },
    { dateAchat: new Date(), lieu: new CoordonneesGPS(60, 60) },
    { dateAchat: new Date(), lieu: new CoordonneesGPS(70, 70) },
    { dateAchat: new Date(), lieu: new CoordonneesGPS(80, 80) },
    { dateAchat: new Date(), lieu: new CoordonneesGPS(90, 90) }
  ];

  const resultat = FraudeService.detecterFraude(transactionsMock);

  expect(resultat).toBe(true);
});


test("doit calculer une distance cohérente", () => {
  const paris = new CoordonneesGPS(48.8566, 2.3522);
  const londres = new CoordonneesGPS(51.5074, -0.1278);

  const distance = paris.distanceVers(londres);

  expect(distance).toBeGreaterThan(300);
  expect(distance).toBeLessThan(400);
});

test("MOCK - doit appeler distanceVers lors de la détection de fraude", () => {
  // MOCK : on espionne la méthode distanceVers
  const mockLieu = {
    distanceVers: jest.fn().mockReturnValue(200) // retourne 200km
  };

  const transactions = Array.from({ length: 6 }, () => ({
    dateAchat: new Date(),
    lieu: mockLieu
  }));

  FraudeService.detecterFraude(transactions);

  // Vérifie que distanceVers a bien été appelée
  expect(mockLieu.distanceVers).toHaveBeenCalled();
});