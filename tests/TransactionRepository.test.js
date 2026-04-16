const TransactionRepository = require("../src/infrastructure/repositories/TransactionRepository");

test("doit sauvegarder une transaction", () => {

  const transaction = {
    montant: 100,
    dateAchat: new Date()
  };

  TransactionRepository.save(transaction);

  const data = TransactionRepository.getAll();

  expect(data.length).toBeGreaterThan(0);

});