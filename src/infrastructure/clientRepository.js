const fs = require('fs');
const PATH = './clients.json';

function sauvegarder(clients) {
  fs.writeFileSync(PATH, JSON.stringify(clients, null, 2));
}

function charger() {
  if (!fs.existsSync(PATH)) return [];
  return JSON.parse(fs.readFileSync(PATH));
}

module.exports = { sauvegarder, charger };