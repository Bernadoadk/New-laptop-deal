# New Laptop Deal — Full-Stack Gaming E-commerce (Bénin)

Plateforme e-commerce spécialisée dans le hardware gaming, basée au Bénin.

## 🚀 Stack Technique

- **Frontend** : React 18, Vite, Tailwind CSS v3, Framer Motion, Zustand, TanStack Query.
- **Backend** : Node.js, Express, Prisma ORM, PostgreSQL.
- **Sécurité** : JWT, Bcrypt, Middleware de protection.

## 🛠️ Installation

1. **Cloner le repository**
2. **Installer toutes les dépendances** :
   ```bash
   npm run install:all
   ```
3. **Configurer la base de données** :
   - Créer un fichier `.env` dans le dossier `/server` (utiliser `.env.example` comme base).
   - Définir `DATABASE_URL` (PostgreSQL).
4. **Initialiser la base de données** :
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. **Lancer le projet en développement** :
   ```bash
   npm run dev
   ```

## 🔐 Credentials Admin (Seed)

- **Email** : `admin@newlaptopdeal.com`
- **Password** : `Admin@2026`

## 📁 Structure du Projet

- `/client` : Application React (Port 5173 par défaut)
- `/server` : API REST Express & Prisma (Port 5000 par défaut)
- `/server/uploads` : Stockage local des images produits

## ✨ Fonctionnalités Clés

- **Configurateur PC** : Choisissez vos composants et visualisez le prix en temps réel.
- **Presets Recommandés** : Configurations testées et approuvées par nos experts.
- **Panel Admin Complet** : Gestion des stocks, commandes, et presets de configuration.
- **Design Cyber-Gamer** : Interface sombre, néon, et animations fluides.
