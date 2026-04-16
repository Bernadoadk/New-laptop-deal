import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Product } from '../../types';
import { Camera, X, CheckSquare, Square, Package, Type, DollarSign, Tag, Info } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, 'Désignation trop courte'),
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

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
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

  const isBestsellerChecked = watch('isBestseller');

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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
          <label className="text-[10px] font-bold uppercase text-nld-muted tracking-[0.2em] ml-1">Vignette de Référence</label>
          <div className="relative aspect-square rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center overflow-hidden group transition-all hover:border-accent/30 hover:bg-white/[0.07]">
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button 
                    type="button" 
                    onClick={() => { setPreview(null); setImageFile(null); }}
                    className="p-4 bg-red-500 rounded-2xl text-white shadow-xl hover:scale-110 transition-transform"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </>
            ) : (
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 text-nld-muted">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Upload Media</p>
                  <p className="text-[10px] text-nld-muted font-medium">PNG, JPG jusqu'à 5MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input label="Désignation Commerciale" placeholder="ex: ASUS ROG Zephyrus G14" {...register('name')} error={errors.name?.message} />
          <Select 
            label="Segment Catalogue" 
            options={[
              { value: 'Setup Gaming', label: 'Setup Gaming (Complet)' },
              { value: 'Laptop', label: 'Ordinateur Portable' },
              { value: 'Périphériques', label: 'Composants & Périphs' },
              { value: 'Réparation', label: 'Maintenance Service' },
              { value: 'Accessoires', label: 'Accessoires Elite' },
            ]} 
            {...register('category')} 
            error={errors.category?.message} 
          />
          <Input label="Prix de Vente (FCFA)" type="number" placeholder="0" {...register('price')} error={errors.price?.message} />
          <Select 
            label="Marquage Marketing" 
            options={[
              { value: '', label: 'Valeur Standard' },
              { value: 'new', label: 'NEW ARRIVAL' },
              { value: 'hot', label: 'HOT DEAL' },
              { value: 'top', label: 'PREMIUM CHOICE' },
            ]} 
            {...register('badge')} 
          />
          <Select 
            label="Statut Logistique" 
            options={[
              { value: 'instock', label: 'Disponible en Stock' },
              { value: 'lowstock', label: 'Alerte Stock Faible' },
              { value: 'outofstock', label: 'Rupture de Stock' },
            ]} 
            {...register('stock')} 
          />
          <div className="flex items-end pb-2">
            <button
              type="button"
              onClick={() => setValue('isBestseller', !isBestsellerChecked)}
              className="flex items-center gap-3 group w-full p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-accent/30 transition-all"
            >
              {isBestsellerChecked ? (
                <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center text-white"><CheckSquare className="w-4 h-4" /></div>
              ) : (
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-nld-muted"><Square className="w-4 h-4" /></div>
              )}
              <span className="text-xs font-bold uppercase text-white tracking-widest">Mettre en avant (Best Seller)</span>
            </button>
            <input type="checkbox" className="hidden" {...register('isBestseller')} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase text-nld-muted tracking-[0.2em] ml-1">Spécifications Techniques & Description</label>
        <textarea
          placeholder="Décrivez les points clés de cette référence..."
          className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-3xl focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all text-white font-medium placeholder:text-nld-muted/40 min-h-[160px] scrollbar-hide"
          {...register('description')}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
        <div className="flex items-center gap-3 text-nld-muted/40 italic text-xs">
          <Info className="w-4 h-4" />
          Vérifiez les données avant la publication finale.
        </div>
        <Button size="lg" type="submit" isLoading={isLoading} className="px-16 py-5 shadow-premium-glow rounded-2xl w-full sm:w-auto">
          {initialData ? 'METTRE À JOUR LE DOSSIER' : 'PUBLIER LA RÉFÉRENCE'}
        </Button>
      </div>
    </form>
  );
};
