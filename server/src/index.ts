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

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
