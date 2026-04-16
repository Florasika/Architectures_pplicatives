
class CoordonneesGPS {
  constructor(latitude, longitude) {
    if (latitude < -90 || latitude > 90) throw new Error("Latitude invalide");
    if (longitude < -180 || longitude > 180) throw new Error("Longitude invalide");

    this.latitude = latitude;
    this.longitude = longitude;
  }

  // Calcul de distance en km (formule de Haversine)
  distanceVers(autresCoordonnees) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this._toRad(autresCoordonnees.latitude - this.latitude);
    const dLon = this._toRad(autresCoordonnees.longitude - this.longitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this._toRad(this.latitude)) *
      Math.cos(this._toRad(autresCoordonnees.latitude)) *
      Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  _toRad(deg) {
    return deg * (Math.PI / 180);
  }
}

module.exports = CoordonneesGPS;