const fs = require('fs');
const CompteClient = require('../../domain/entities/CompteClient');
const StatutVIP = require('../../domain/valueObjects/StatutVIP');

const PATH = './data/clients.json';

class ClientRepository {

  _read() {
    if (!fs.existsSync(PATH)) return [];
    return JSON.parse(fs.readFileSync(PATH));
  }

  _write(data) {
    fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
  }

  findAll() {
    return this._read();
  }

  /*findById(idClient) {
    return this._read().find(c => c.idClient == idClient);
  }*/


  findById(idClient) {
    const data = this._read().find(c => c.idClient == idClient);
    if (!data) return null;
    return new CompteClient({
      ...data,
      statutActuel: new StatutVIP(data.statutActuel.niveau)
    });
  }

  save(client) {
    const clients = this._read();

    const index = clients.findIndex(c => c.idClient === client.idClient);

    if (index === -1) {
      clients.push(client);
    } else {
      clients[index] = client;
    }

    this._write(clients);
  }
}

module.exports = new ClientRepository();