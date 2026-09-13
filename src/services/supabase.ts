import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://piqvzdbyfedqsxpbeofh.supabase.co";
const supabaseAnonKey = "sb_publishable_-VTgL_Yw6VdFw0no_88XuA_4Qr3bByi";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("http") &&
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY"
);

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!supabaseClient) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    } catch (err) {
      console.warn("[SHAM360] Failed to initialize Supabase client:", err);
      supabaseClient = null;
    }
  }
  return supabaseClient;
}

export interface SupabaseProfileUpdatePayload {
  direct_redirect_enabled?: boolean;
  direct_redirect_url?: string;
  [key: string]: any;
}

/**
 * Updates a profile row in Supabase 'profiles' table.
 * If Supabase is not configured, logs info and gracefully succeeds.
 */
export async function updateProfileInSupabase(
  profileIdentifier: string,
  payload: SupabaseProfileUpdatePayload
): Promise<{ success: boolean; error?: any }> {
  const client = getSupabase();
  if (!client) {
    console.info(
      "[SHAM360] Supabase not configured; skipping direct Supabase table write."
    );
    return { success: true };
  }

  try {
    // Try matching by id or slug
    const { data, error } = await client
      .from("profiles")
      .update(payload)
      .or(`id.eq.${profileIdentifier},slug.eq.${profileIdentifier}`)
      .select();

    if (error) {
      console.warn("[SHAM360] Supabase profile update notice:", error.message);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.warn("[SHAM360] Supabase query caught exception:", err);
    return { success: false, error: err };
  }
}
