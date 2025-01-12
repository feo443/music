"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowLeft, CreditCard, Plus, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

interface Profile {
  id: string;
  display_name: string | null;
  email: string;
  instagram_url?: string;
  twitter_url?: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        router.push("/auth/login");
      }
    };

    getSession();
  }, [router, supabase.auth]);

  useEffect(() => {
    const getProfile = async () => {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          setProfile(data);
          setSocialLinks({
            instagram: data.instagram_url || '',
            twitter: data.twitter_url || ''
          });
        }
      }
    };

    getProfile();
  }, [session, supabase]);

  const handleSocialLinksUpdate = async () => {
    if (!session?.user?.id) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          instagram_url: socialLinks.instagram,
          twitter_url: socialLinks.twitter,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating social links:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="p-4">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-white/75 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Link>
      </div>

      <div className="max-w-[600px] mx-auto px-4 py-8">
        <main className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-xl font-medium text-white">Configuración</h1>
            <p className="text-sm text-white/50">Administra la configuración de tu cuenta</p>
          </div>

          {/* Account Settings */}
          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h2 className="text-sm font-medium text-white mb-4">Cuenta</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/75 mb-1">Email</label>
                  <p className="text-sm text-white">{session.user.email}</p>
                </div>

                <div>
                  <label className="block text-sm text-white/75 mb-1">Nombre</label>
                  <p className="text-sm text-white">{profile?.display_name || 'No configurado'}</p>
                </div>

                <Link 
                  href="/dashboard/edit-profile"
                  className="inline-block text-sm text-[#4DBAFF] hover:text-[#4DBAFF]/80 transition-colors"
                >
                  Editar Perfil
                </Link>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h2 className="text-sm font-medium text-white mb-4">Redes Sociales</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/75 mb-2">Instagram</label>
                  <div className="flex items-center space-x-2 bg-[#262626] rounded-lg p-3">
                    <Instagram className="h-4 w-4 text-white/50" />
                    <input
                      type="text"
                      value={socialLinks.instagram}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="URL de tu perfil de Instagram"
                      className="flex-1 bg-transparent text-sm text-white border-none focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/75 mb-2">Twitter</label>
                  <div className="flex items-center space-x-2 bg-[#262626] rounded-lg p-3">
                    <Twitter className="h-4 w-4 text-white/50" />
                    <input
                      type="text"
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                      placeholder="URL de tu perfil de Twitter"
                      className="flex-1 bg-transparent text-sm text-white border-none focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSocialLinksUpdate}
                  disabled={isSaving}
                  className="w-full bg-[#262626] hover:bg-[#333333] text-white rounded-lg p-3 text-sm transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h2 className="text-sm font-medium text-white mb-4">Pagos</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/75 mb-2">Método de pago</label>
                  <button 
                    className="w-full flex items-center justify-center space-x-2 bg-[#262626] hover:bg-[#333333] text-white rounded-lg p-4 text-sm transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Agregar método de pago</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-white/75 mb-2">Historial de facturación</label>
                  <div className="bg-[#262626] rounded-lg p-4 text-center">
                    <p className="text-sm text-white/50">No hay historial de facturación disponible</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full bg-[#1A1A1A] text-white rounded-lg p-4 text-sm hover:bg-[#262626] transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </main>
      </div>
    </div>
  );
} 