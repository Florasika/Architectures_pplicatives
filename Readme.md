# Architecture Applicative – Projet DDD (Fraude & Statut Client VIP)

**Auteur :** NOUDOUKOU FLORA
**Formation :** EPSI M1 Systèmes d'Information
**Matière :** Architecture Applicative

---

# Description

Ce projet est une application backend développée en **Node.js (Express)** suivant les principes de **Domain Driven Design (DDD)** et de **Clean Architecture**.

Projet réalisé dans un contexte pédagogique pour la mise en pratique de l’architecture applicative avancée.

## Sujet

**Moteur de Fidélité et de Récompenses** — Un programme de fidélité pour une chaîne de magasins où les clients cumulent des points afin de débloquer des statuts (**Bronze**, **Silver**, **Gold**) et des récompenses.

---

# Règles métier implémentées

### Calcul du statut VIP

Le statut est recalculé en fonction des dépenses cumulées sur les **12 derniers mois glissants** :

* Bronze : < 1000€
* Silver : ≥ 1000€
* Gold : ≥ 2000€

### Expiration des points

Les points acquis lors d'un achat expirent **365 jours** après leur acquisition.

### Prévention de la fraude

Un compte est gelé si le système détecte :

* Plus de **5 transactions**
* Dans des magasins physiquement éloignés (**> 50 km**)
* En moins d'une heure

---

# Objectifs pédagogiques

* Mise en place d’une architecture DDD
* Séparation des responsabilités (Domain / Application / Infrastructure / Interface)
* Implémentation de services métiers
* Utilisation de Value Objects et Entities
* Tests unitaires avec Jest (Mocks & Stubs)
* Persistance simple via JSON

---

# Diagramme UML

![alt text](<Diagramme sans nom.drawio-1.png>)

---

# Architecture du projet

```bash
src/
├── application/          # Use Cases (orchestration)
│   ├── TraiterTransaction.js
│   └── RecalculerStatutClient.js
│
├── domain/
│   ├── entities/         # Entités métier
│   │   ├── CompteClient.js
│   │   ├── Transaction.js
│   │   └── Recompense.js
│
│   ├── valueObjects/     # Value Objects immuables
│   │   ├── StatutVIP.js
│   │   ├── PointDetail.js
│   │   └── CoordonneesGPS.js
│
│   ├── services/         # Services du domaine
│   │   ├── FraudeService.js
│   │   └── StatutService.js
│
│   └── strategies/       # Strategy Pattern
│       └── StrategiePoints.js
│
├── infrastructure/       # Persistance (fichiers JSON)
│   └── repositories/
│       ├── clientRepository.js
│       └── TransactionRepository.js
│
└── interface/            # API REST (Express)
    ├── controllers/
    │   └── ClientController.js
    ├── routes/
    │   └── ClientRoutes.js
    └── server.js

tests/
├── FraudeService.test.js
├── StatutService.test.js
├── TransactionRepository.test.js
└── StrategiePoints.test.js

data/
├── transactions.json
└── clients.json
```

---

# Installation

## 1. Cloner le projet

```bash
git clone <repo-url>
cd <nom-projet>
```

## 2. Installer les dépendances

```bash
npm install
```

## 3. Lancer le serveur

```bash
node src/interface/server.js
```

---

# Tests

Les tests sont réalisés avec **Jest**.

## Lancer les tests

```bash
npm test
```

## Types de tests

* Tests avec Stub (données fictives)
* Tests avec Mock (comportement simulé)
* Tests des règles métier principales

---

# Statut VIP

Le statut est calculé sur les dépenses des 12 derniers mois :

* GOLD → ≥ 2000€
* SILVER → ≥ 1000€
* BRONZE → < 1000€

---

# Détection de fraude

Une transaction est considérée comme suspecte si :

* Déplacements géographiques incohérents
* Comportements anormaux sur plusieurs transactions

---

# Technologies utilisées

* Node.js
* Express.js
* Jest
* Architecture DDD
* JSON (persistance simple)

---

# Design Patterns utilisés

* Repository Pattern
* Service Layer
* Value Object
* Domain Service
* Strategy Pattern
* Singleton

---

# Points forts du projet

* Architecture propre et scalable
* Séparation claire des responsabilités
* Code testable et maintenable
* Respect des principes SOLID
* Bonne couverture de tests unitaires

---

# Améliorations possibles

* Passage à une base de données (SQLite / PostgreSQL)
* Ajout de Swagger pour documentation API
* Containerisation avec Docker
* Authentification JWT
* Logging avancé

---

# Endpoints API

```bash
POST   /api/clients                 # Créer un client
POST   /api/clients/:id/transactions # Ajouter une transaction
GET    /api/clients/:id             # Consulter un client
```

---

# Contraintes respectées

## Entités

* **CompteClient** — gère les transactions, les points et le gel du compte
* **Transaction** — calcule les points selon le statut et la stratégie
* **Recompense** — vérifie si un client peut débloquer une récompense

## Value Objects

* **StatutVIP** — encapsule le niveau et le multiplicateur de points
* **PointDetail** — valeur + date d'acquisition + expiration à 365 jours
* **CoordonneesGPS** — coordonnées + calcul de distance (formule de Haversine)

---

# Design Patterns implémentés

## Singleton

```javascript
module.exports = new ClientRepository();
```

## Strategy Pattern

```javascript
transaction.calculerPoints(statutVIP, new StrategyDoublePoints());
```

---

# Tests

## Test avec Stub

Dans **StatutService.test.js** :

Des objets `{ montant, dateAchat }` remplacent de vraies instances Transaction avec des valeurs fixes.

## Test avec Mock

Dans **FraudeService.test.js** :

```javascript
const mockLieu = { distanceVers: jest.fn().mockReturnValue(200) };

expect(mockLieu.distanceVers).toHaveBeenCalled();
```

---

# Auteur

**Flora Noudoukou**
EPSI - M1 Systèmes d'Information
