import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Product } from '../../types';
import { Camera, X } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, 'Nom trop court'),
  category: z.string().min(1, 'Catégorie requise'),
  price: z.string().min(1, 'Prix requis'),
  description: z.string().optional(),
  badge: z.string().optional(),
  stock: z.string(),
  isBestseller: z.boolean().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      category: initialData.category,
      price: initialData.price.toString(),
      description: initialData.description || '',
      badge: initialData.badge || '',
      stock: initialData.stock,
      isBestseller: initialData.isBestseller,
    } : {
      stock: 'instock',
      isBestseller: false,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (data: ProductFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-4">
          <label className="text-xs font-bold uppercase text-nld-muted tracking-widest">Image Produit</label>
          <div className="relative aspect-video rounded-xl border-2 border-dashed border-border bg-bg-2 flex items-center justify-center overflow-hidden group">
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => { setPreview(null); setImageFile(null); }}
                  className="absolute top-2 right-2 p-1 bg-accent-red rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-2">
                <Camera className="w-8 h-8 text-nld-muted" />
                <span className="text-[10px] text-nld-muted font-bold uppercase">Sélectionner image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Nom du Produit" {...register('name')} error={errors.name?.message} />
          <Select 
            label="Catégorie" 
            options={[
              { value: 'Setup Gaming', label: 'Setup Gaming' },
              { value: 'Laptop', label: 'Laptop' },
              { value: 'Périphériques', label: 'Périphériques' },
              { value: 'Réparation', label: 'Réparation' },
              { value: 'Accessoires', label: 'Accessoires' },
            ]} 
            {...register('category')} 
            error={errors.category?.message} 
          />
          <Input label="Prix (FCFA)" type="number" {...register('price')} error={errors.price?.message} />
          <Select 
            label="Badge" 
            options={[
              { value: '', label: 'Aucun' },
              { value: 'new', label: 'NEW' },
              { value: 'hot', label: 'HOT' },
              { value: 'top', label: 'TOP GEAR' },
            ]} 
            {...register('badge')} 
          />
          <Select 
            label="Statut Stock" 
            options={[
              { value: 'instock', label: 'En Stock' },
              { value: 'lowstock', label: 'Stock Faible' },
              { value: 'outofstock', label: 'En Rupture' },
            ]} 
            {...register('stock')} 
          />
          <div className="flex items-center gap-2 pt-8">
            <input type="checkbox" id="isBestseller" {...register('isBestseller')} className="w-5 h-5 accent-accent" />
            <label htmlFor="isBestseller" className="text-sm font-bold uppercase text-white cursor-pointer">Best Seller</label>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase text-nld-muted tracking-widest">Description</label>
        <textarea
          className="w-full bg-bg-2 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent transition-colors text-nld-text min-h-[120px]"
          {...register('description')}
        />
      </div>

      <div className="flex justify-end pt-6 border-t border-border">
        <Button size="lg" type="submit" isLoading={isLoading} className="px-12">
          {initialData ? 'METTRE À JOUR' : 'CRÉER LE PRODUIT'}
        </Button>
      </div>
    </form>
  );
};
