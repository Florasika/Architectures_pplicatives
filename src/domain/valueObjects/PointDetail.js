class PointDetail {
  constructor({ valeur, dateAcquisition }) {
    if (valeur <= 0) {
      throw new Error("La valeur des points doit être positive");
    }

    this.valeur = valeur;
    this.dateAcquisition = new Date(dateAcquisition);
  }

  estValide(dateActuelle) {
    const maintenant = new Date(dateActuelle);

    const dateExpiration = new Date(this.dateAcquisition);
    dateExpiration.setDate(dateExpiration.getDate() + 365);

    return maintenant <= dateExpiration;
  }
}

module.exports = PointDetail;