import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products.routes';
import orderRoutes from './routes/orders.routes';
import componentRoutes from './routes/components.routes';
import presetRoutes from './routes/presets.routes';
import employeeRoutes from './routes/employees.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/presets', presetRoutes);
app.use('/api/employees', employeeRoutes);

// Servir les fichiers statiques du client (React/Vite build)
const clientPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientPath));

// Gérer le routage SPA (Single Page Application)
// Redirige toutes les requêtes non-API vers l'index.html du client
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientPath, 'index.html'));
  } else {
    res.status(404).json({ message: 'API route not found' });
  }
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
