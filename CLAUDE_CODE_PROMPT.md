

## CONTEXTE DU PROJET

Tu vas générer un projet full-stack complet appelé **New Laptop Deal** — une plateforme e-commerce gaming basée au Bénin (Abomey-Calavi / Cotonou) qui vend des PC gamer, setups, périphériques et services de réparation.

Le projet comprend :
- Un **site client** (vitrine + catalogue + configurateur de setup + panier + commande)
- Un **panel admin** (gestion commandes, produits, composants configurateur, presets)
- Une **API REST** complète
- Une **base de données** PostgreSQL avec Prisma

Les interfaces HTML de référence sont dans le dossier `./references/` :
- `new-laptop-deal.html` → design et UX du site client
- `new-laptop-deal-admin.html` → design et UX du panel admin

**REPRODUIS FIDÈLEMENT** ces interfaces (couleurs, typographie, effets, layout) en les convertissant en composants React/Tailwind.

---

## STACK TECHNIQUE

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS v3** (avec config personnalisée reprenant les CSS variables des maquettes)
- **React Router v6** (SPA multi-pages)
- **Zustand** (state management : panier, auth admin)
- **React Query / TanStack Query** (fetching, cache, mutations)
- **Axios** (client HTTP)
- **React Hook Form** + **Zod** (formulaires + validation)
- **Framer Motion** (animations — reproduire les effets fadeUp, glow, float des maquettes)
- **Lucide React** (icônes)
- **React Hot Toast** (notifications)
- **Google Fonts** : Orbitron + Rajdhani + Share Tech Mono (site client) / JetBrains Mono + Syne (admin)

### Backend
- **Node.js** + **Express.js**
- **Prisma ORM** + **PostgreSQL**
- **JWT** (authentification admin)
- **bcryptjs** (hash mots de passe)
- **Multer** + **Sharp** (upload et resize images produits)
- **CORS** + **Helmet** + **Morgan**
- **express-validator** (validation des entrées)
- **dotenv**

### Structure Monorepo
```
new-laptop-deal/
├── client/          ← React + Vite
├── server/          ← Express API
├── .env.example
└── README.md
```

---

## STRUCTURE DÉTAILLÉE DU PROJET

### /server

```
server/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── index.ts
│   ├── config/
│   │   └── database.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── upload.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── products.routes.ts
│   │   ├── orders.routes.ts
│   │   ├── components.routes.ts
│   │   └── presets.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── products.controller.ts
│   │   ├── orders.controller.ts
│   │   ├── components.controller.ts
│   │   └── presets.controller.ts
│   └── utils/
│       └── formatPrice.ts
├── uploads/         ← images produits stockées ici
└── package.json
```

### /client

```
client/
├── public/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css       ← variables CSS + fonts
│   ├── api/
│   │   ├── axios.ts
│   │   ├── products.api.ts
│   │   ├── orders.api.ts
│   │   ├── components.api.ts
│   │   └── presets.api.ts
│   ├── store/
│   │   ├── cartStore.ts
│   │   └── authStore.ts
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   ├── useOrders.ts
│   │   ├── useComponents.ts
│   │   └── usePresets.ts
│   ├── pages/
│   │   ├── client/
│   │   │   ├── Home.tsx
│   │   │   ├── Catalogue.tsx
│   │   │   ├── Configurateur.tsx
│   │   │   └── Panier.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       ├── AdminLayout.tsx
│   │       ├── Dashboard.tsx
│   │       ├── Orders.tsx
│   │       ├── Products.tsx
│   │       ├── Components.tsx
│   │       └── Presets.tsx
│   ├── components/
│   │   ├── client/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Ticker.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ConfiguratorPanel.tsx
│   │   │   ├── SummaryPanel.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── OrderModal.tsx
│   │   │   └── Footer.tsx
│   │   ├── admin/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── KpiCard.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   └── PresetEditor.tsx
│   │   └── ui/
│   │       ├── Modal.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       └── Badge.tsx
│   └── types/
│       └── index.ts
├── tailwind.config.ts
└── vite.config.ts
```

---

## SCHÉMA PRISMA (schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  category    String
  description String?
  price       Int
  image       String?  // URL image uploadée
  badge       String?  // "new" | "hot" | "top" | null
  isBestseller Boolean @default(false)
  stock       String   @default("instock") // "instock" | "lowstock" | "outofstock"
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  OrderItems  OrderItem[]
}

model Order {
  id         Int         @id @default(autoincrement())
  reference  String      @unique // "NLD-001"
  clientName String
  clientPhone String
  zone       String
  notes      String?
  status     String      @default("pending") // pending | confirmed | delivered | cancelled
  totalAmount Int
  type       String      @default("product") // "product" | "setup"
  items      OrderItem[]
  setupConfig Json?       // config du setup si type = "setup"
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  order     Order   @relation(fields:[orderId], references:[id])
  orderId   Int
  product   Product? @relation(fields:[productId], references:[id])
  productId Int?
  name      String  // snapshot nom au moment commande
  price     Int
  quantity  Int     @default(1)
}

model ComponentCategory {
  id       Int                 @id @default(autoincrement())
  key      String              @unique // "gpu" | "cpu" | "ram" etc.
  label    String              // "GPU" | "CPU" etc.
  emoji    String              @default("🔧")
  sortOrder Int               @default(0)
  options  ComponentOption[]
}

model ComponentOption {
  id          Int               @id @default(autoincrement())
  category    ComponentCategory @relation(fields:[categoryId], references:[id])
  categoryId  Int
  name        String
  price       Int
  isActive    Boolean           @default(true)
  PresetItems SetupPresetItem[]
}

model SetupPreset {
  id        Int               @id @default(autoincrement())
  key       String            @unique // "entry" | "mid" | "ultra"
  label     String            // "ENTRY GAMER" | "MID BEAST" | "ULTRA PRO"
  emoji     String            @default("⚡")
  sortOrder Int               @default(0)
  items     SetupPresetItem[]
}

model SetupPresetItem {
  id         Int             @id @default(autoincrement())
  preset     SetupPreset     @relation(fields:[presetId], references:[id])
  presetId   Int
  option     ComponentOption @relation(fields:[optionId], references:[id])
  optionId   Int
}
```

---

## SEED (prisma/seed.ts)

Génère un seed complet avec :

### Admin par défaut
```
email: admin@newlaptopdeal.com
password: Admin@2026 (hashé avec bcrypt)
name: New Laptop Deal
```

### 12 produits avec vraies données
Chaque produit doit avoir :
- Un vrai nom commercial (ex: "BATTLESTATION PRO X")
- Une vraie description marketing en français
- Un prix cohérent en FCFA
- Une catégorie parmi : "Setup Gaming", "Laptop", "Périphériques", "Réparation", "Accessoires"
- `isBestseller: true` pour les 4 premiers
- `stock` réaliste
- Pour l'image : utilise des URLs Unsplash réelles de matériel gaming, format :
  `https://images.unsplash.com/photo-[ID]?w=600&q=80`
  Exemples d'IDs Unsplash gaming réels :
  - PC setup: `1587202372775-e229f172b9d2`
  - Gaming laptop: `1496181133206-80ce9b88a853`
  - Keyboard: `1541140532154-b024d705b90a`
  - Monitor: `1527443224154-c4a3942d3acf`
  - Gaming chair: `1598550476439-6a1f857f6a8a`
  - GPU: `1593640408182-31c4de9fd4f0`

### Composants du configurateur
**GPU** (options réelles avec prix FCFA réalistes) :
- GTX 1660 Super 6GB → 62.000 F
- RTX 3060 12GB → 125.000 F
- RTX 4060 8GB → 205.000 F
- RTX 4060 Ti 16GB → 285.000 F
- RTX 4070 12GB → 425.000 F
- RTX 4070 Super → 520.000 F

**CPU** :
- Core i5-12400F → 57.000 F
- Core i7-12700K → 88.000 F
- Core i7-13700K → 115.000 F
- Ryzen 5 7600X → 78.000 F
- Ryzen 7 7700X → 112.000 F
- Core i9-13900K → 155.000 F

**RAM** :
- 8 Go DDR4 3200MHz → 18.000 F
- 16 Go DDR4 3600MHz → 32.000 F
- 16 Go DDR5 5200MHz → 48.000 F
- 32 Go DDR5 5200MHz → 68.000 F
- 64 Go DDR5 6000MHz → 125.000 F

**STOCKAGE** :
- 512 Go SSD NVMe Gen3 → 18.000 F
- 1 To SSD NVMe Gen3 → 28.000 F
- 1 To SSD NVMe Gen4 → 38.000 F
- 2 To SSD NVMe Gen4 → 58.000 F
- 2 To SSD + 4 To HDD → 72.000 F

**ALIMENTATION** :
- 550W 80+ Bronze → 22.000 F
- 650W 80+ Gold → 34.000 F
- 750W 80+ Gold Modular → 48.000 F
- 850W 80+ Platinum → 62.000 F
- 1000W 80+ Titanium → 90.000 F

**BOÎTIER** :
- Mid-Tower Basique ATX → 22.000 F
- Mid-Tower RGB Vitré → 45.000 F
- Full-Tower Premium → 72.000 F
- Full-Tower RGB Luxe → 92.000 F

**COOLING** :
- Ventirad Stock CPU → 0 F (inclus)
- Ventirad Tour RGB 120mm → 18.000 F
- AIO Watercooling 240mm → 48.000 F
- AIO Watercooling 360mm → 68.000 F

**CARTE MÈRE** :
- B660M DDR4 mATX → 45.000 F
- B760 DDR5 ATX → 68.000 F
- Z790 DDR5 ATX → 112.000 F
- X670E DDR5 ATX → 125.000 F

### 3 Presets
- **ENTRY GAMER** (emoji ⚡) : GTX 1660S / i5-12400F / 16Go DDR4 / 512Go / 550W / Mid-Tower Basique / Ventirad Stock / B660M
- **MID BEAST** (emoji 🔥) : RTX 4060 / i7-12700K / 32Go DDR5 / 1To Gen4 / 650W Gold / Mid-Tower RGB / AIO 240mm / B760
- **ULTRA PRO** (emoji 👑) : RTX 4070 Super / i9-13900K / 64Go DDR5 / 2To Gen4 / 850W Platinum / Full-Tower Luxe / AIO 360mm / Z790

### 8 commandes de démo
Clients béninois avec noms réalistes (Kofi, Amina, Rodrigue, Fatou, Jean-Luc, Serge, etc.), statuts variés, montants cohérents.

---

## API ENDPOINTS

### Auth
```
POST   /api/auth/login          → { email, password } → { token, admin }
GET    /api/auth/me             → (auth) → admin info
```

### Products
```
GET    /api/products            → liste tous (query: ?category=&search=&bestseller=)
GET    /api/products/:id        → un produit
POST   /api/products            → (auth) créer produit + upload image (multipart)
PUT    /api/products/:id        → (auth) modifier
DELETE /api/products/:id        → (auth) supprimer
PATCH  /api/products/:id/stock  → (auth) changer stock
```

### Orders
```
GET    /api/orders              → (auth) liste (query: ?status=&search=)
GET    /api/orders/:id          → (auth) détail commande
POST   /api/orders              → créer commande (public — depuis site client)
PATCH  /api/orders/:id/status   → (auth) changer statut
DELETE /api/orders/:id          → (auth) supprimer
GET    /api/orders/stats        → (auth) KPIs dashboard
```

### Components
```
GET    /api/components          → toutes catégories + options (public)
POST   /api/components/category → (auth) nouvelle catégorie
POST   /api/components/option   → (auth) nouvelle option
PUT    /api/components/option/:id → (auth) modifier option
DELETE /api/components/option/:id → (auth) supprimer option
```

### Presets
```
GET    /api/presets             → tous les presets avec options (public)
PUT    /api/presets/:key        → (auth) modifier un preset (changer options)
```

---

## DESIGN — TAILWIND CONFIG

```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050508',
          2: '#0a0a10',
          3: '#0f0f18',
        },
        panel: {
          DEFAULT: '#12121e',
          2: '#181a26',
        },
        border: {
          DEFAULT: '#1e1e32',
          2: '#2a2d45',
        },
        accent: {
          DEFAULT: '#00f0ff',
          2: '#ff3c00',
          3: '#7000ff',
          gold: '#ffd700',
          green: '#4fffb0',
          red: '#ff4d6d',
          blue: '#4d9fff',
          yellow: '#ffd60a',
        },
        nld: {
          text: '#e0e0f0',
          muted: '#6060a0',
          muted2: '#7a80a8',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,240,255,0.3)',
        'glow-2': '0 0 20px rgba(255,60,0,0.3)',
        'glow-green': '0 0 16px rgba(79,255,176,0.25)',
      },
      animation: {
        ticker: 'ticker 22s linear infinite',
        gridPulse: 'gridPulse 4s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
        pulse: 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        gridPulse: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      clipPath: {
        hex: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
        'hex-sm': 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        'hex-xs': 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)',
      },
    },
  },
  plugins: [],
}
```

---

## FONCTIONNALITÉS CLÉS À IMPLÉMENTER

### Site Client

#### Page Accueil (Home.tsx)
- Hero animé avec grille de fond pulsante, effets glow, cursor dot personnalisé
- Ticker défilant en haut
- Section Best Sellers (4 produits marqués `isBestseller`) → données API réelles
- Configurateur preview avec 3 presets → données API réelles, prix calculés dynamiquement
- Section "Pourquoi nous" avec 4 cards
- Stats animées (500+ PCs, 150+ Setups, 4.9★)

#### Catalogue (Catalogue.tsx)
- Fetch tous les produits depuis `/api/products`
- Barre de recherche (filtre en temps réel côté client)
- Filtres par catégorie (chips cliquables)
- Compteur de résultats
- Chaque card : image réelle (Unsplash), nom, desc, prix, badge, bouton "COMMANDER" + "+ PANIER"
- Skeleton loading pendant le fetch

#### Configurateur (Configurateur.tsx)
- Fetch composants depuis `/api/components`
- Fetch presets depuis `/api/presets`
- 3 boutons preset qui pré-sélectionnent les composants
- Pour chaque catégorie : un `<select>` avec toutes les options et leurs prix
- Panel résumé à droite : mise à jour en temps réel du total (somme des composants sélectionnés + 25.000 F assemblage)
- Specs affichées : GPU, CPU, RAM, Stockage sélectionnés + Assemblage inclus + Garantie 6 mois
- Boutons "COMMANDER CE SETUP" et "NÉGOCIER LE PRIX" → modal formulaire → POST `/api/orders`
- Le setup commandé envoie un `setupConfig` JSON avec tous les composants choisis

#### Panier (Panier.tsx — Zustand)
- State Zustand : `{ items: Product[], addItem, removeItem, clearCart }`
- Persisté dans localStorage
- Page panier : liste des articles, total, formulaire de commande → POST `/api/orders` avec les items
- Page vide avec CTA vers catalogue
- Compteur dans la navbar mis à jour en temps réel

#### Modal de commande (OrderModal.tsx)
- Champs : Nom, WhatsApp, Zone de livraison, Notes
- Validation Zod : nom requis, téléphone format +229XXXXXXXX, zone requise
- On submit : POST `/api/orders` → toast succès/erreur
- Après succès : vider le panier si commande panier, fermer modal

### Panel Admin

#### Login (AdminLogin.tsx)
- Form email + password → POST `/api/auth/login`
- Token JWT stocké dans Zustand (authStore) + localStorage
- Redirect vers dashboard si déjà connecté
- Design dark identique aux maquettes admin

#### Route Guard
- `<PrivateRoute>` qui vérifie le token avant d'afficher les pages admin
- Si pas de token → redirect `/admin/login`

#### Dashboard
- Fetch `/api/orders/stats` → KPIs (total, pending, delivered, products count)
- 4 KPI cards colorées
- Tableau des 5 dernières commandes
- Liste des produits en stock critique (lowstock + outofstock)

#### Gestion Commandes (Orders.tsx)
- Fetch `/api/orders` avec React Query
- Recherche + filtres par statut
- Tableau complet : référence, client, téléphone, produit/build, montant, zone, statut, date
- Voir détail → drawer ou modal avec timeline de suivi
- Changer statut (pending→confirmed→delivered) → PATCH `/api/orders/:id/status`
- Supprimer → DELETE + confirmation
- Créer manuellement → POST `/api/orders`

#### Gestion Produits (Products.tsx)
- Fetch `/api/products` avec React Query
- Tableau avec image thumbnail, nom, catégorie, prix, stock badge, bestseller
- Formulaire ajout/modification : tous les champs + **upload image** (multipart/form-data)
  - Preview de l'image avant upload
  - L'image uploadée est redimensionnée par Sharp à 600x400px côté serveur
  - Stockée dans `/uploads/` et servie par Express comme static
- Filtre + recherche
- Toggle bestseller directement depuis le tableau
- Changer stock depuis tableau

#### Gestion Composants (Components.tsx)
- Fetch `/api/components`
- Affichage par catégorie (GPU, CPU, RAM, etc.)
- Ajouter option : nom + prix → POST `/api/components/option`
- Modifier option → PUT `/api/components/option/:id`
- Supprimer option (si minimum 1 option restante) → DELETE
- Minimum 1 option par catégorie (validation côté front et back)

#### Gestion Presets (Presets.tsx)
- Fetch `/api/presets` + `/api/components`
- Pour chaque preset : un `<select>` par catégorie avec toutes les options disponibles
- Valeur sélectionnée = option actuellement dans le preset
- Panneau de prévisualisation à droite avec total calculé
- Bouton Sauvegarder → PUT `/api/presets/:key` pour chaque preset modifié

---

## VARIABLES D'ENVIRONNEMENT (.env.example)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/new_laptop_deal"

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Client
CLIENT_URL=http://localhost:5173

# Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

```env
# Client (.env dans /client)
VITE_API_URL=http://localhost:5000/api
```

---

## PACKAGE.JSON — SCRIPTS

### /server/package.json
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset --force && tsx prisma/seed.ts"
  }
}
```

### /client/package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### /package.json (racine)
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\"",
    "install:all": "npm install && npm install --prefix server && npm install --prefix client",
    "db:seed": "npm run db:seed --prefix server"
  }
}
```

---

## INSTRUCTIONS GÉNÉRALES POUR CLAUDE CODE

1. **Génère TOUS les fichiers** listés dans la structure — ne laisse aucun fichier vide ou avec un commentaire "TODO".

2. **Données réelles** — Le seed doit peupler la base avec des données complètes et cohérentes. Utilise de vrais noms de composants PC avec leurs vraies caractéristiques techniques.

3. **Images** — Utilise des URLs Unsplash réelles pour les produits. Chaque produit DOIT avoir une image différente et pertinente (gaming setup, laptop, périphérique, etc.).

4. **Design fidèle** — Reproduis exactement :
   - Les couleurs (`#050508` bg, `#00f0ff` accent cyan, `#ff3c00` accent orange-red)
   - La typographie (Orbitron pour titres, Rajdhani pour texte, Share Tech Mono pour labels)
   - Les effets `clip-path: polygon()` sur les boutons (forme trapèze)
   - Le cursor dot personnalisé (point cyan qui suit la souris)
   - Le ticker défilant en haut de page
   - Les animations fadeUp au scroll (IntersectionObserver → Framer Motion)
   - Les effets glow sur les éléments accent

5. **Sécurité** — Toutes les routes admin protégées par middleware JWT. Valider toutes les entrées côté serveur avec express-validator.

6. **Gestion d'erreurs** — Handler global Express pour les erreurs. React Query avec retry et error states. Toasts pour les erreurs utilisateur.

7. **Responsive** — Le site client doit être responsive mobile. L'admin peut être desktop-only.

8. **README.md** — Génère un README complet avec :
   - Prérequis (Node 18+, PostgreSQL, etc.)
   - Installation pas à pas
   - Variables d'environnement
   - Scripts disponibles
   - Credentials admin par défaut

9. **Ne demande pas de confirmation** — Génère tout d'un coup, fichier par fichier, du schéma Prisma jusqu'aux derniers composants React.

10. **Ordre de génération recommandé** :
    1. Structure dossiers + package.json
    2. schema.prisma + seed.ts
    3. Server : index.ts → middleware → routes → controllers
    4. Client : tailwind.config + index.css → types → api → store → ui components → page components → pages → App.tsx + main.tsx
    5. .env.example + README.md

---

## RÉSULTAT ATTENDU

Un projet qui se lance avec :
```bash
npm run install:all
# Configurer .env avec DATABASE_URL
npm run db:migrate
npm run db:seed
npm run dev
```

Et qui produit :
- **http://localhost:5173** → Site client gaming complet et fonctionnel
- **http://localhost:5173/admin** → Panel admin complet avec login
- **http://localhost:5000/api** → API REST documentée

Le site final doit être **visuellement identique** aux maquettes de référence, **entièrement fonctionnel** de bout en bout, avec de vraies données, de vraies images, et zéro fonctionnalité manquante.
