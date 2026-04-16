import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, Navigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Laptop, Lock, AtSign, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Identifiant trop court')
    .regex(/^@[\w.]+$/, 'Format invalide — doit commencer par @'),
  password: z.string().min(6, 'Minimum 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const AdminLogin = () => {
  const { setAuth, token, isOwner } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Si déjà connecté, rediriger selon le rôle
  if (token) {
    return <Navigate to={isOwner() ? '/admin/owner' : '/admin'} replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`,
        { identifier: data.identifier.toLowerCase().trim(), password: data.password }
      );
      setAuth(response.data.token, response.data.user);
      toast.success('Authentification réussie.');
      // Redirection selon le rôle reçu
      navigate(response.data.user.role === 'owner' ? '/admin/owner' : '/admin', { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Identifiants invalides.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center shadow-premium-glow mb-8 transition-transform hover:scale-105 duration-500">
            <Laptop className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black font-outfit text-white tracking-tight uppercase italic flex items-center gap-3">
            NLD <span className="premium-gradient-text not-italic">Console.</span>
          </h1>
          <p className="text-[10px] text-nld-muted font-bold tracking-[0.5em] uppercase mt-4 opacity-60">Système d'administration sécurisé</p>
        </div>

        <div className="premium-card p-10 border-white/5 shadow-2xl">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Connexion Sécurisée</h2>
            <p className="text-sm text-nld-muted font-medium">Entrez votre identifiant unique et votre mot de passe.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative group">
              <AtSign className="absolute left-4 top-[42px] w-5 h-5 text-nld-muted group-focus-within:text-accent transition-colors" />
              <Input
                label="Identifiant"
                placeholder="@votre.identifiant.owner"
                className="pl-12 rounded-2xl bg-white/5 border-white/10 focus:border-accent/40"
                {...register('identifier')}
                error={errors.identifier?.message}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-[42px] w-5 h-5 text-nld-muted group-focus-within:text-accent transition-colors" />
              <Input
                label="Mot de Passe"
                type="password"
                placeholder="••••••••••••"
                className="pl-12 rounded-2xl bg-white/5 border-white/10 focus:border-accent/40"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <Button type="submit" className="w-full py-5 rounded-2xl shadow-premium-glow flex items-center justify-center gap-3" isLoading={loading}>
              <ShieldCheck className="w-5 h-5" />
              ACCÉDER AU PANNEAU
            </Button>
          </form>
        </div>

        <div className="flex flex-col items-center mt-12 space-y-4">
          <p className="text-[10px] font-bold text-nld-muted/40 uppercase tracking-[0.3em]">
            Protocole SSL/TLS Certifié &copy; 2026 NLD Systems
          </p>
          <div className="flex gap-6 opacity-30">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse [animation-delay:200ms]" />
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};
