import { createClient } from '@supabase/supabase-js';

// ✅ Supabase VTC Dashboard — même base que le dashboard pour recevoir les résas en temps réel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://amhhptkignyvqrlssqys.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtaGhwdGtpZ255dnFybHNzcXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDU4MjIsImV4cCI6MjA5MDYyMTgyMn0.pjwvfjCEVb1A3GrqyMSm01Nls9EYUnQFIsYuozBeoWI';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials manquantes. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types alignés sur le schéma du dashboard VTC Pro
export interface Reservation {
    id?: string;
    user_id?: string | null;
    nom_client: string;
    tel_client: string;
    depart: string;
    destination: string;
    date_heure: string;
    message?: string;
    source?: string;
    statut?: string;
    montant?: number;
    marque?: string;
    created_at?: string;
}
