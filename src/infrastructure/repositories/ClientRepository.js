const fs = require('fs');
const path = require('path');
const CompteClient = require('../../domain/entities/CompteClient');
const StatutVIP = require('../../domain/valueObjects/StatutVIP');

const PATH = path.join(__dirname, '../../../data/clients.json');
//console.log("PATH UTILISÉ :", PATH);

class ClientRepository {

  _read() {
    if (!fs.existsSync(PATH)) return [];
    return JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  }

  _write(data) {
    const dir = path.dirname(PATH);
    console.log("Écriture dans :", PATH);       
    console.log("Dossier existe :", fs.existsSync(dir)); 
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
    console.log("Écriture OK !");             
  }

  findAll() {
    return this._read();
  }

  /*findById(idClient) {
    return this._read().find(c => c.idClient == idClient);
  }*/


  /*findById(idClient) {
    const data = this._read().find(c => c.idClient == idClient);
    if (!data) return null;
    return new CompteClient({
      ...data,
      statutActuel: new StatutVIP(data.statutActuel.niveau)
    });
  }*/
  findById(idClient) {
    const data = this._read().find(c => c.idClient == idClient);
    if (!data) return null;

    const client = new CompteClient({
      ...data,
      statutActuel: new StatutVIP(data.statutActuel.niveau)
    });

    // ✅ Reconstruire les transactions comme objets Transaction
    client.transactions = (data.transactions || []).map(t =>
      new Transaction({
        ...t,
        lieu: new CoordonneesGPS(t.lieu.latitude, t.lieu.longitude)
      })
    );

    return client;
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