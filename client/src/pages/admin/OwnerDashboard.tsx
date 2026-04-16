import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { Employee } from '../../types';
import {
  Crown, Users, Plus, UserCheck, UserX, Trash2, Eye, EyeOff,
  AtSign, Lock, X, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Hook fetch employees ─────────────────────────────────────────────────────
function useEmployees(token: string | null) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${API}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(data);
    } catch {
      toast.error('Erreur lors du chargement des employés.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, [token]);

  return { employees, loading, refetch: fetchEmployees };
}

// ─── Modal Créer Employé ──────────────────────────────────────────────────────
interface CreateModalProps {
  onClose: () => void;
  onCreated: () => void;
  token: string | null;
}

function CreateEmployeeModal({ onClose, onCreated, token }: CreateModalProps) {
  const [form, setForm] = useState({ nom: '', prenom: '', codeSecret: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cleanStr = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

  const previewId = form.nom && form.prenom && form.codeSecret
    ? `@${cleanStr(form.nom)}.${cleanStr(form.prenom)}.employee${cleanStr(form.codeSecret)}`
    : null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = 'Nom requis.';
    if (!form.prenom.trim()) e.prenom = 'Prénom requis.';
    if (!form.codeSecret.trim()) e.codeSecret = 'Code secret requis.';
    if (!form.password || form.password.length < 8) e.password = 'Minimum 8 caractères.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/employees`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Employé créé avec succès !');
      onCreated();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur lors de la création.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-white">Nouvel Employé</h2>
            <p className="text-sm text-nld-muted mt-1">Créer un accès administrateur employé</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-nld-muted hover:text-white transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Nom"
                placeholder="Adikpeto"
                value={form.nom}
                onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                error={errors.nom}
              />
            </div>
            <div>
              <Input
                label="Prénom"
                placeholder="Bernado"
                value={form.prenom}
                onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                error={errors.prenom}
              />
            </div>
          </div>

          <Input
            label="Code Secret (partie de l'identifiant)"
            placeholder="ex: 1234"
            value={form.codeSecret}
            onChange={e => setForm(f => ({ ...f, codeSecret: e.target.value }))}
            error={errors.codeSecret}
          />

          {/* Preview identifiant */}
          {previewId && (
            <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-xl">
              <AtSign className="w-4 h-4 text-accent flex-shrink-0" />
              <div>
                <p className="text-[10px] text-nld-muted uppercase tracking-widest mb-0.5">Identifiant généré</p>
                <p className="text-sm font-mono font-bold text-accent">{previewId}</p>
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              label="Mot de passe initial"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 caractères"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-4 top-[42px] text-nld-muted hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Annuler</Button>
            <Button type="submit" className="flex-1" isLoading={loading}>
              <Plus className="w-4 h-4" /> Créer l'employé
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Main OwnerDashboard ──────────────────────────────────────────────────────
export const OwnerDashboard = () => {
  const { token, user } = useAuthStore();
  const { employees, loading, refetch } = useEmployees(token);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);

  const handleToggle = async (id: number) => {
    setToggling(id);
    try {
      await axios.patch(`${API}/employees/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await refetch();
    } catch {
      toast.error('Erreur lors de la mise à jour.');
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Supprimer l'employé "${name}" ? Cette action est irréversible.`)) return;
    setDeleting(id);
    try {
      await axios.delete(`${API}/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Employé supprimé.');
      await refetch();
    } catch {
      toast.error('Erreur lors de la suppression.');
    } finally {
      setDeleting(null);
    }
  };

  const activeCount = employees.filter(e => e.isActive).length;
  const inactiveCount = employees.filter(e => !e.isActive).length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] text-amber-400/80 uppercase">Console Propriétaire</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Bienvenue, <span className="text-amber-400">{user?.name}.</span>
            </h1>
            <p className="text-nld-muted mt-2">Gérez vos employés et contrôlez leurs accès au panneau d'administration.</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black">
            <Plus className="w-4 h-4" /> Ajouter un employé
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Total Employés', value: employees.length, icon: Users, color: 'text-white', bg: 'bg-white/5' },
          { label: 'Actifs', value: activeCount, icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Désactivés', value: inactiveCount, icon: UserX, color: 'text-red-400', bg: 'bg-red-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl border border-white/5 ${stat.bg}`}
          >
            <div className="flex items-center gap-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-nld-muted mt-0.5">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Employés */}
      <div className="premium-card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white">Gestion des Employés</h2>
          </div>
          <span className="text-xs text-nld-muted">{employees.length} compte(s)</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Users className="w-12 h-12 text-nld-muted/30" />
            <p className="text-nld-muted">Aucun employé créé pour l'instant.</p>
            <Button onClick={() => setShowModal(true)} size="sm">
              <Plus className="w-4 h-4" /> Créer le premier employé
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {employees.map((emp, i) => (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-5 hover:bg-white/2 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${
                    emp.isActive ? 'bg-accent/10 text-accent' : 'bg-white/5 text-nld-muted'
                  }`}>
                    {emp.prenom[0]}{emp.nom[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{emp.prenom} {emp.nom}</p>
                    <p className="text-xs font-mono text-nld-muted mt-0.5">{emp.identifier}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status badge */}
                  <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                    emp.isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {emp.isActive
                      ? <><CheckCircle2 className="w-3 h-3" /> Actif</>
                      : <><AlertCircle className="w-3 h-3" /> Inactif</>
                    }
                  </span>

                  {/* Toggle */}
                  <button
                    onClick={() => handleToggle(emp.id)}
                    disabled={toggling === emp.id}
                    title={emp.isActive ? 'Désactiver' : 'Activer'}
                    className={`p-2.5 rounded-xl border transition-all ${
                      emp.isActive
                        ? 'bg-red-500/5 border-red-500/10 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500'
                        : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
                    }`}
                  >
                    {toggling === emp.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : emp.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />
                    }
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(emp.id, `${emp.prenom} ${emp.nom}`)}
                    disabled={deleting === emp.id}
                    title="Supprimer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-nld-muted hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                  >
                    {deleting === emp.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />
                    }
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Identifiant Owner */}
      <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-start gap-4">
          <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-400 mb-1">Votre identifiant proprietaire</p>
            <p className="text-xs font-mono text-white/70">{user?.identifier}</p>
            <p className="text-xs text-nld-muted mt-1">Ne partagez jamais cet identifiant ni votre mot de passe.</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <CreateEmployeeModal
            token={token}
            onClose={() => setShowModal(false)}
            onCreated={refetch}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
