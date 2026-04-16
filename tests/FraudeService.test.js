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