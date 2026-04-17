const fs = require('fs');
const path = require('path');
const TransactionRepository = require("../src/infrastructure/repositories/TransactionRepository");
const PATH = '../data/transactions.json';

beforeEach(() => {
  fs.writeFileSync(path.join(__dirname, PATH), '[]');
});

test("doit sauvegarder une transaction", () => {

  const transaction = {
    montant: 100,
    dateAchat: new Date()
  };

  TransactionRepository.save(transaction);

  const data = TransactionRepository.getAll();

  expect(data.length).toBeGreaterThan(0);

});