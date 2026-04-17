#  Architecture Applicative – Projet DDD (Fraude & Statut Client VIP)

Auteur: NOUDOUKOU FLORA
FORMATION: EPSI M1 SYSTEMES D'INFORMATION
MATIERE: ARCHITECTURE APLLICATIVE

## Description

Ce projet est une application backend développée en **Node.js (Express)** suivant les principes de **Domain Driven Design (DDD)** et de **Clean Architecture**.
Projet réalisé dans un contexte pédagogique pour la mise en pratique de l’architecture applicative avancée.

Sujet
Moteur de Fidélité et de Récompenses — Un programme de fidélité pour une chaîne de magasins où les clients cumulent des points pour débloquer des statuts (Bronze, Silver, Gold) et des récompenses.

Règles métier implémentées

• Calcul du statut VIP : le statut est recalculé en fonction des dépenses cumulées sur les 12 derniers mois glissants (Bronze < 1000€ / Silver ≥ 1000€ / Gold ≥ 2000€)
• Expiration des points : les points acquis lors d'un achat expirent exactement 365 jours après leur acquisition
• Prévention de la fraude : un compte est gelé si le système détecte plus de 5 transactions dans des magasins physiquement éloignés (> 50 km) en moins d'une heure

## Objectifs pédagogiques

- Mise en place d’une architecture DDD
- Séparation des responsabilités (Domain / Application / Infrastructure / Interface)
- Implémentation de services métiers
- Utilisation de Value Objects et Entities
- Tests unitaires avec Jest (Mocks & Stubs)
- Persistance simple via JSON

## Diagramme UML
![alt text](<Diagramme sans nom.drawio.png>)

## Architecture du projet

src/
├── application/          # Use Cases (orchestration)
│   ├── TraiterTransaction.js
│   └── RecalculerStatutClient.js
├── domain/
│   ├── entities/         # Entités métier
│   │   ├── CompteClient.js
│   │   ├── Transaction.js
│   │   └── Recompense.js
│   ├── valueObjects/     # Value Objects immuables
│   │   ├── StatutVIP.js
│   │   ├── PointDetail.js
│   │   └── CoordonneesGPS.js
│   ├── services/         # Services du domaine
│   │   ├── FraudeService.js
│   │   └── StatutService.js
│   └── strategies/       # Strategy Pattern
│       └── StrategiePoints.js
├── infrastructure/       # Persistance (fichiers JSON)
│   └── repositories/
│       ├── clientRepository.js
│       └── TransactionRepository.js
└── interface/            # API REST (Express)
    ├── controllers/
         └── ClientController.js
    ├── routes/
         └── ClientRoutes.js
    server.js
tests/
├── FraudeService.test.js
├── StatutService.test.js
├── TransactionRepository.test.js
└── StrategiePoints.test.js
data/
└── transaction.json
└── clients.json




##  Installation

### 1. Cloner le projet
git clone <repo-url>
cd <nom-projet>

2. Installer les dépendances
npm install

3. Lancer le serveur
node src/interface/server.js

Les tests sont réalisés avec Jest.

Lancer les tests :
npm test

Types de tests :
- Tests avec Stub (données fictives)
- Tests avec Mock (comportement simulé)
- Règles métier principales
- Statut VIP

Le statut est calculé sur les dépenses des 12 derniers mois :

GOLD → ≥ 2000€
SILVER → ≥ 1000€
BRONZE → < 1000€

♠ Détection de fraude

Une transaction est considérée comme suspecte si :

- déplacements géographiques incohérents
- comportements anormaux sur plusieurs transactions

♦ Technologies utilisées
- Node.js
- Express.js
- Jest
- Architecture DDD
- JSON (persistance simple)

♣ Design Patterns utilisés
- Repository Pattern
- Service Layer
- Value Object
- Domain Service
- Dependency Isolation

♣ Points forts du projet
- Architecture propre et scalable
- Séparation claire des responsabilités
- Code testable et maintenable
- Respect des principes SOLID
- Couverture de tests unitaires

♣ Améliorations possibles
- Passage à une base de données (SQLite / PostgreSQL)
- Ajout de Swagger pour documentation API
- Containerisation avec Docker
- Authentification JWT
- Logging avancé


♠ Endpoints API
• POST/api/clients-----------> Créer un client
• POST/api/clients/:id/transactions-----------> Ajouter une transaction
• GET/api/clients/:id----------------> Consulter un client

Contraintes respectées: Au moins 3 Entités

CompteClient — gère les transactions, les points et le gel du compte
Transaction — calcule les points selon le statut et la stratégie
Recompense — vérifie si un client peut débloquer une récompense

Au moins 2 Value Objects

StatutVIP — encapsule le niveau et le multiplicateur de points
PointDetail — valeur + date d'acquisition + règle d'expiration à 365 jours
CoordonneesGPS — coordonnées + calcul de distance (formule de Haversine)

Au moins 2 Design Patterns (hors MVC)
1. Singleton — clientRepository.js exporte une instance unique :
jsmodule.exports = new ClientRepository();
2. Strategy Pattern — le calcul des points est externalisé dans des stratégies interchangeables :
jstransaction.calculerPoints(statutVIP, new StrategyDoublePoints());

• 1 test avec Stub
Dans StatutService.test.js — des objets { montant, dateAchat } remplacent de vraies instances Transaction avec des valeurs fixes.

• 1 test avec Mock
Dans FraudeService.test.js — jest.fn() espionne les appels à distanceVers() :
jsconst mockLieu = { distanceVers: jest.fn().mockReturnValue(200) };
expect(mockLieu.distanceVers).toHaveBeenCalled();