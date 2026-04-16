export interface Product {
  id: number;
  name: string;
  category: string;
  description: string | null;
  price: number;
  image: string | null;
  badge: string | null;
  isBestseller: boolean;
  stock: 'instock' | 'lowstock' | 'outofstock';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentOption {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  isActive: boolean;
  category?: ComponentCategory;
}

export interface ComponentCategory {
  id: number;
  key: string;
  label: string;
  emoji: string;
  sortOrder: number;
  options: ComponentOption[];
}

export interface SetupPresetItem {
  id: number;
  presetId: number;
  optionId: number;
  option: ComponentOption;
}

export interface SetupPreset {
  id: number;
  key: string;
  label: string;
  emoji: string;
  sortOrder: number;
  items: SetupPresetItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number | null;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  reference: string;
  clientName: string;
  clientPhone: string;
  zone: string;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  totalAmount: number;
  type: 'product' | 'setup';
  items: OrderItem[];
  setupConfig: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  productCount: number;
  revenue: number;
}

// ─── Auth models ─────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  name: string;
  identifier: string;
  role: 'owner' | 'employee';
}

export interface Employee {
  id: number;
  nom: string;
  prenom: string;
  identifier: string;
  isActive: boolean;
  createdAt: string;
}
