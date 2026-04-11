import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, Navigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Laptop, Lock, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const AdminLogin = () => {
  const { setAuth, token } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  if (token) return <Navigate to="/admin" />;

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`, data);
      setAuth(response.data.token, response.data.admin);
      toast.success('Accès autorisé. Bienvenue, Administrateur.');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Identifiants invalides.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-glow mb-6">
            <Laptop className="text-bg w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black font-orbitron text-white">NLD CORE SYSTEM</h1>
          <p className="text-[10px] text-accent font-bold tracking-[0.4em] uppercase mt-2">Authentification Requise</p>
        </div>

        <div className="glass-panel p-8 border-accent/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-[38px] w-5 h-5 text-nld-muted" />
              <Input 
                label="Email" 
                placeholder="admin@newlaptopdeal.com" 
                className="pl-12"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-[38px] w-5 h-5 text-nld-muted" />
              <Input 
                label="Mot de Passe" 
                type="password" 
                placeholder="••••••••" 
                className="pl-12"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <Button type="submit" className="w-full py-4" isLoading={loading}>
              DÉVERROUILLER L'ACCÈS
            </Button>
          </form>
        </div>

        <p className="text-center mt-12 text-[10px] font-mono text-nld-muted uppercase tracking-widest">
          Système sécurisé v2.0 &copy; 2026 New Laptop Deal
        </p>
      </div>
    </div>
  );
};
