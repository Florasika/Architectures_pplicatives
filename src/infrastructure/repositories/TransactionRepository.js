const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../data/transactions.json");

class TransactionRepository {

  static getAll() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }

  static save(transaction) {
    const transactions = this.getAll();
    transactions.push(transaction);
    fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));
  }

}

module.exports = new TransactionRepository();