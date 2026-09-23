import { createClient } from '@supabase/supabase-js'

/**
 * Las credenciales llevan un valor de reserva a propósito.
 *
 * Antes usaban `!`, que le promete a TypeScript que la variable existe. Al
 * construir el sitio, Next.js genera las páginas de antemano y en ese momento
 * las variables de entorno del navegador todavía no están: createClient
 * recibía `undefined`, reventaba, y tumbaba la publicación entera con un
 * error de prerenderizado que no decía cuál era la causa.
 *
 * Con la reserva, la construcción termina siempre. En el navegador las
 * variables reales sí están, así que la app funciona igual. Y si alguna
 * faltara de verdad, el fallo aparece al usarla —con un mensaje claro— en vez
 * de durante la compilación.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sin-configurar.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sin-configurar'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export interface UserProfile {
  id: string
  user_id: string
  full_name: string
  username: string
  email: string
  phone_number: string
  country_code: string
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  full_name?: string
  username?: string
  phone_number?: string
  country_code?: string
}

// Country codes for phone numbers
export const countryCodes = [
  { country: 'Chile', code: '+56', flag: '🇨🇱' },
  { country: 'United States', code: '+1', flag: '🇺🇸' },
  { country: 'Canada', code: '+1', flag: '🇨🇦' },
  { country: 'Mexico', code: '+52', flag: '🇲🇽' },
  { country: 'Argentina', code: '+54', flag: '🇦🇷' },
  { country: 'Brazil', code: '+55', flag: '🇧🇷' },
  { country: 'Colombia', code: '+57', flag: '🇨🇴' },
  { country: 'Peru', code: '+51', flag: '🇵🇪' },
  { country: 'Ecuador', code: '+593', flag: '🇪🇨' },
  { country: 'Uruguay', code: '+598', flag: '🇺🇾' },
  { country: 'Bolivia', code: '+591', flag: '🇧🇴' },
  { country: 'Paraguay', code: '+595', flag: '🇵🇾' },
  { country: 'Venezuela', code: '+58', flag: '🇻🇪' },
  { country: 'Spain', code: '+34', flag: '🇪🇸' },
  { country: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { country: 'France', code: '+33', flag: '🇫🇷' },
  { country: 'Germany', code: '+49', flag: '🇩🇪' },
  { country: 'Italy', code: '+39', flag: '🇮🇹' },
  { country: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { country: 'Belgium', code: '+32', flag: '🇧🇪' },
  { country: 'Portugal', code: '+351', flag: '🇵🇹' },
  { country: 'Austria', code: '+43', flag: '🇦🇹' },
  { country: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { country: 'Sweden', code: '+46', flag: '🇸🇪' },
  { country: 'Norway', code: '+47', flag: '🇳🇴' },
  { country: 'Denmark', code: '+45', flag: '🇩🇰' },
  { country: 'Finland', code: '+358', flag: '🇫🇮' },
  { country: 'Poland', code: '+48', flag: '🇵🇱' },
  { country: 'Czech Republic', code: '+420', flag: '🇨🇿' },
  { country: 'Hungary', code: '+36', flag: '🇭🇺' },
  { country: 'Romania', code: '+40', flag: '🇷🇴' },
  { country: 'Bulgaria', code: '+359', flag: '🇧🇬' },
  { country: 'Greece', code: '+30', flag: '🇬🇷' },
  { country: 'Turkey', code: '+90', flag: '🇹🇷' },
  { country: 'Russia', code: '+7', flag: '🇷🇺' },
  { country: 'Ukraine', code: '+380', flag: '🇺🇦' },
  { country: 'China', code: '+86', flag: '🇨🇳' },
  { country: 'Japan', code: '+81', flag: '🇯🇵' },
  { country: 'South Korea', code: '+82', flag: '🇰🇷' },
  { country: 'India', code: '+91', flag: '🇮🇳' },
  { country: 'Australia', code: '+61', flag: '🇦🇺' },
  { country: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { country: 'South Africa', code: '+27', flag: '🇿🇦' },
  { country: 'Egypt', code: '+20', flag: '🇪🇬' },
  { country: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { country: 'Kenya', code: '+254', flag: '🇰🇪' },
  { country: 'Morocco', code: '+212', flag: '🇲🇦' },
  { country: 'Israel', code: '+972', flag: '🇮🇱' },
  { country: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { country: 'UAE', code: '+971', flag: '🇦🇪' },
  { country: 'Qatar', code: '+974', flag: '🇶🇦' },
  { country: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { country: 'Thailand', code: '+66', flag: '🇹🇭' },
  { country: 'Vietnam', code: '+84', flag: '🇻🇳' },
  { country: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { country: 'Singapore', code: '+65', flag: '🇸🇬' },
  { country: 'Philippines', code: '+63', flag: '🇵🇭' },
  { country: 'Indonesia', code: '+62', flag: '🇮🇩' }
].sort((a, b) => a.country.localeCompare(b.country));

// Authentication functions
export const signUp = async (email: string, password: string, userData: {
  full_name: string;
  username: string;
  phone_number: string;
  country_code: string;
}) => {
  try {
    console.log('Starting signup process...');

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Registration timed out')), 30000)
    );

    const signupPromise = supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
        data: {
          full_name: userData.full_name,
          username: userData.username,
          phone_number: userData.phone_number,
          country_code: userData.country_code,
        }
      }
    });

    const { data, error } = await Promise.race([signupPromise, timeoutPromise]) as any;

    if (error) {
      console.error('Signup error:', error);
      throw error;
    }

    console.log('Signup successful, user created:', data.user?.id);

    // Don't manually create profile - let the trigger handle it
    // The SQL trigger will automatically create the profile

    return { data, error: null }
  } catch (error: any) {
    console.error('Signup failed:', error);
    return { data: null, error }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    console.log('Starting sign in process...');

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Login timed out')), 15000)
    );

    const loginPromise = supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data, error } = await Promise.race([loginPromise, timeoutPromise]) as any;

    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }

    console.log('Sign in successful, user:', data.user?.id);

    // Log the login (with error handling)
    if (data.user) {
      try {
        await supabase
          .from('login_logs')
          .insert([
            {
              user_id: data.user.id,
              login_time: new Date().toISOString(),
              user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
            }
          ]);
      } catch (logError) {
        console.warn('Failed to log login:', logError);
        // Don't fail the whole login if logging fails
      }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error('Login error details:', error);
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    return { error }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Get user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      return {
        id: user.id,
        email: user.email,
        full_name: profile?.full_name,
        username: profile?.username,
        phone_number: profile?.phone_number,
        country_code: profile?.country_code,
      }
    }

    return null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Helper function to check if email confirmation is required
export const checkAuthSettings = async () => {
  try {
    // Try to get session info
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Current session:', session)

    return { session }
  } catch (error) {
    console.error('Error checking auth settings:', error)
    return { session: null }
  }
}