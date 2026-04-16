const TransactionRepository = require("../../infrastructure/repositories/TransactionRepository");

exports.createTransaction = (req, res) => {

  const transaction = req.body;

  TransactionRepository.save(transaction);

  res.status(201).json({
    message: "Transaction enregistrée"
  });

};