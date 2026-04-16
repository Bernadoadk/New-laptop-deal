"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    // 1. Admin
    const hashedPassword = await bcryptjs_1.default.hash('Admin@2026', 10);
    await prisma.admin.upsert({
        where: { email: 'admin@newlaptopdeal.com' },
        update: {},
        create: {
            email: 'admin@newlaptopdeal.com',
            password: hashedPassword,
            name: 'New Laptop Deal',
        },
    });
    // 2. Products
    const products = [
        {
            name: 'BATTLESTATION PRO X',
            category: 'Setup Gaming',
            description: 'L\'ultime machine de guerre pour les streamers et pros. Performance sans compromis avec refroidissement liquide.',
            price: 1250000,
            image: '/battlestation_pro_x.png',
            badge: 'top',
            isBestseller: true,
            stock: 'instock',
        },
        {
            name: 'ROG ZEPHYRUS G14',
            category: 'Laptop',
            description: 'Le laptop gaming le plus puissant et portable. Écran 120Hz et finition premium.',
            price: 950000,
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
            badge: 'hot',
            isBestseller: true,
            stock: 'instock',
        },
        {
            name: 'APEX KEYBOARD RGB',
            category: 'Périphériques',
            description: 'Clavier mécanique ultra-réactif avec switches personnalisables et rétroéclairage RGB dynamique.',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80',
            badge: 'new',
            isBestseller: true,
            stock: 'instock',
        },
        {
            name: 'ULTRAVIEW 27" 144Hz',
            category: 'Périphériques',
            description: 'Moniteur IGZO pour une immersion totale. Couleurs vibrantes et temps de réponse de 1ms.',
            price: 185000,
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
            badge: null,
            isBestseller: true,
            stock: 'lowstock',
        },
        {
            name: 'IRON THRONE GAMING',
            category: 'Accessoires',
            description: 'Chaise ergonomique pour sessions marathon. Confort lombaire et accoudoirs 4D.',
            price: 125000,
            image: 'https://images.unsplash.com/photo-1598550476439-6a1f857f6a8a?w=600&q=80',
            badge: null,
            isBestseller: false,
            stock: 'instock',
        },
        {
            name: 'RTX 4070 SUPER DUAL',
            category: 'Accessoires',
            description: 'Carte graphique de dernière génération pour du gaming en 4K fluide.',
            price: 520000,
            image: '/premium_gpu_hero.png',
            badge: 'hot',
            isBestseller: false,
            stock: 'instock',
        },
        {
            name: 'OFFICE SETUP BASIC',
            category: 'Setup Gaming',
            description: 'Configuration équilibrée pour le travail et le gaming léger après les cours.',
            price: 450000,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
            badge: null,
            isBestseller: false,
            stock: 'instock',
        },
        {
            name: 'RESTAURATION SYSTÈME PRO',
            category: 'Réparation',
            description: 'Nettoyage complet, changement de pâte thermique et optimisation logicielle.',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1597872200382-0bf5cd399a2a?w=600&q=80',
            badge: null,
            isBestseller: false,
            stock: 'instock',
        },
        {
            name: 'RAZER DEATHADDER V3',
            category: 'Périphériques',
            description: 'Souris gaming ultra-légère préférée des pros de l\'e-sport.',
            price: 55000,
            image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80',
            badge: 'hot',
            isBestseller: false,
            stock: 'instock',
        },
        {
            name: 'HYPERX CLOUD II',
            category: 'Périphériques',
            description: 'Casque audio surround 7.1 pour localiser vos ennemis avec précision.',
            price: 65000,
            image: 'https://images.unsplash.com/photo-1583394838336-acd9929a5f91?w=600&q=80',
            badge: null,
            isBestseller: false,
            stock: 'instock',
        },
        {
            name: 'VALORANT STARTER PACK',
            category: 'Setup Gaming',
            description: 'Le meilleur rapport qualité/prix pour commencer votre aventure compétitive.',
            price: 380000,
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
            badge: 'new',
            isBestseller: false,
            stock: 'lowstock',
        },
        {
            name: 'UPGRADE SSD 1TO',
            category: 'Réparation',
            description: 'Installation d\'un SSD NVMe haute vitesse et migration de vos données.',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80',
            badge: null,
            isBestseller: false,
            stock: 'instock',
        },
    ];
    for (const p of products) {
        await prisma.product.create({ data: p });
    }
    // 3. Component Categories and Options
    const categories = [
        {
            key: 'gpu',
            label: 'GPU',
            emoji: '🎮',
            sortOrder: 1,
            options: [
                { name: 'GTX 1660 Super 6GB', price: 62000 },
                { name: 'RTX 3060 12GB', price: 125000 },
                { name: 'RTX 4060 8GB', price: 205000 },
                { name: 'RTX 4060 Ti 16GB', price: 285000 },
                { name: 'RTX 4070 12GB', price: 425000 },
                { name: 'RTX 4070 Super', price: 520000 },
            ],
        },
        {
            key: 'cpu',
            label: 'CPU',
            emoji: '🧠',
            sortOrder: 2,
            options: [
                { name: 'Core i5-12400F', price: 57000 },
                { name: 'Core i7-12700K', price: 88000 },
                { name: 'Core i7-13700K', price: 115000 },
                { name: 'Ryzen 5 7600X', price: 78000 },
                { name: 'Ryzen 7 7700X', price: 112000 },
                { name: 'Core i9-13900K', price: 155000 },
            ],
        },
        {
            key: 'ram',
            label: 'RAM',
            emoji: '⚡',
            sortOrder: 3,
            options: [
                { name: '8 Go DDR4 3200MHz', price: 18000 },
                { name: '16 Go DDR4 3600MHz', price: 32000 },
                { name: '16 Go DDR5 5200MHz', price: 48000 },
                { name: '32 Go DDR5 5200MHz', price: 68000 },
                { name: '64 Go DDR5 6000MHz', price: 125000 },
            ],
        },
        {
            key: 'storage',
            label: 'STOCKAGE',
            emoji: '💾',
            sortOrder: 4,
            options: [
                { name: '512 Go SSD NVMe Gen3', price: 18000 },
                { name: '1 To SSD NVMe Gen3', price: 28000 },
                { name: '1 To SSD NVMe Gen4', price: 38000 },
                { name: '2 To SSD NVMe Gen4', price: 58000 },
                { name: '2 To SSD + 4 To HDD', price: 72000 },
            ],
        },
        {
            key: 'psu',
            label: 'ALIMENTATION',
            emoji: '🔌',
            sortOrder: 5,
            options: [
                { name: '550W 80+ Bronze', price: 22000 },
                { name: '650W 80+ Gold', price: 34000 },
                { name: '750W 80+ Gold Modular', price: 48000 },
                { name: '850W 80+ Platinum', price: 62000 },
                { name: '1000W 80+ Titanium', price: 90000 },
            ],
        },
        {
            key: 'case',
            label: 'BOÎTIER',
            emoji: '📦',
            sortOrder: 6,
            options: [
                { name: 'Mid-Tower Basique ATX', price: 22000 },
                { name: 'Mid-Tower RGB Vitré', price: 45000 },
                { name: 'Full-Tower Premium', price: 72000 },
                { name: 'Full-Tower RGB Luxe', price: 92000 },
            ],
        },
        {
            key: 'cooling',
            label: 'COOLING',
            emoji: '❄️',
            sortOrder: 7,
            options: [
                { name: 'Ventirad Stock CPU', price: 0 },
                { name: 'Ventirad Tour RGB 120mm', price: 18000 },
                { name: 'AIO Watercooling 240mm', price: 48000 },
                { name: 'AIO Watercooling 360mm', price: 68000 },
            ],
        },
        {
            key: 'mobo',
            label: 'CARTE MÈRE',
            emoji: '📟',
            sortOrder: 8,
            options: [
                { name: 'B660M DDR4 mATX', price: 45000 },
                { name: 'B760 DDR5 ATX', price: 68000 },
                { name: 'Z790 DDR5 ATX', price: 112000 },
                { name: 'X670E DDR5 ATX', price: 125000 },
            ],
        },
    ];
    for (const cat of categories) {
        await prisma.componentCategory.create({
            data: {
                key: cat.key,
                label: cat.label,
                emoji: cat.emoji,
                sortOrder: cat.sortOrder,
                options: {
                    create: cat.options,
                },
            },
        });
    }
    // 4. Presets
    const entryGamerOptions = ['GTX 1660 Super 6GB', 'Core i5-12400F', '16 Go DDR4 3600MHz', '512 Go SSD NVMe Gen3', '550W 80+ Bronze', 'Mid-Tower Basique ATX', 'Ventirad Stock CPU', 'B660M DDR4 mATX'];
    const midBeastOptions = ['RTX 4060 8GB', 'Core i7-12700K', '32 Go DDR5 5200MHz', '1 To SSD NVMe Gen4', '650W 80+ Gold', 'Mid-Tower RGB Vitré', 'AIO Watercooling 240mm', 'B760 DDR5 ATX'];
    const ultraProOptions = ['RTX 4070 Super', 'Core i9-13900K', '64 Go DDR5 6000MHz', '2 To SSD NVMe Gen4', '850W 80+ Platinum', 'Full-Tower RGB Luxe', 'AIO Watercooling 360mm', 'Z790 DDR5 ATX'];
    const presets = [
        { key: 'entry', label: 'ENTRY GAMER', emoji: '⚡', sortOrder: 1, optionNames: entryGamerOptions },
        { key: 'mid', label: 'MID BEAST', emoji: '🔥', sortOrder: 2, optionNames: midBeastOptions },
        { key: 'ultra', label: 'ULTRA PRO', emoji: '👑', sortOrder: 3, optionNames: ultraProOptions },
    ];
    for (const p of presets) {
        const preset = await prisma.setupPreset.create({
            data: {
                key: p.key,
                label: p.label,
                emoji: p.emoji,
                sortOrder: p.sortOrder,
            },
        });
        for (const optName of p.optionNames) {
            const option = await prisma.componentOption.findFirst({ where: { name: optName } });
            if (option) {
                await prisma.setupPresetItem.create({
                    data: {
                        presetId: preset.id,
                        optionId: option.id,
                    },
                });
            }
        }
    }
    // 5. Orders (8 demo orders)
    const orders = [
        {
            reference: 'NLD-001',
            clientName: 'Kofi Mensah',
            clientPhone: '+22990000001',
            zone: 'Cotonou - Fidjrossè',
            status: 'delivered',
            totalAmount: 1250000,
            type: 'product',
            createdAt: new Date('2026-03-10'),
        },
        {
            reference: 'NLD-002',
            clientName: 'Amina Salami',
            clientPhone: '+22990000002',
            zone: 'Calavi - Kpota',
            status: 'confirmed',
            totalAmount: 950000,
            type: 'product',
            createdAt: new Date('2026-04-01'),
        },
        {
            reference: 'NLD-003',
            clientName: 'Rodrigue Azon',
            clientPhone: '+22990000003',
            zone: 'Porto-Novo',
            status: 'pending',
            totalAmount: 45000,
            type: 'product',
            createdAt: new Date('2026-04-05'),
        },
        {
            reference: 'NLD-004',
            clientName: 'Fatou Bakayoko',
            clientPhone: '+22990000004',
            zone: 'Cotonou - Akpakpa',
            status: 'delivered',
            totalAmount: 450000,
            type: 'setup',
            setupConfig: { gpu: 'RTX 3060', cpu: 'Core i5-12400F' },
            createdAt: new Date('2026-02-15'),
        },
        {
            reference: 'NLD-005',
            clientName: 'Jean-Luc Dovonou',
            clientPhone: '+22990000005',
            zone: 'Ouidah',
            status: 'pending',
            totalAmount: 185000,
            type: 'product',
            createdAt: new Date('2026-04-09'),
        },
        {
            reference: 'NLD-006',
            clientName: 'Serge Agossa',
            clientPhone: '+22990000006',
            zone: 'Bohicon',
            status: 'cancelled',
            totalAmount: 55000,
            type: 'product',
            createdAt: new Date('2026-03-20'),
        },
        {
            reference: 'NLD-007',
            clientName: 'Modeste Koumamy',
            clientPhone: '+22990000007',
            zone: 'Parakou',
            status: 'confirmed',
            totalAmount: 850000,
            type: 'setup',
            setupConfig: { gpu: 'RTX 4060', cpu: 'Ryzen 5 7600X' },
            createdAt: new Date('2026-04-10'),
        },
        {
            reference: 'NLD-008',
            clientName: 'Sonia Gogan',
            clientPhone: '+22990000008',
            zone: 'Cotonou - Zongo',
            status: 'pending',
            totalAmount: 65000,
            type: 'product',
            createdAt: new Date('2026-04-11'),
        },
    ];
    for (const o of orders) {
        const order = await prisma.order.create({ data: o });
        // Add one item per order for simplicity in seed
        const product = await prisma.product.findFirst();
        if (product) {
            await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: o.type === 'product' ? product.id : null,
                    name: o.type === 'product' ? product.name : 'Custom Setup Build',
                    price: o.totalAmount,
                    quantity: 1,
                },
            });
        }
    }
    console.log('✅ Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
