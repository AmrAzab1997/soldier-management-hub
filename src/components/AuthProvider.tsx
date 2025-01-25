import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthProviderProps {
  children: (props: { user: User | null; loading: boolean }) => React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          toast.error('Error checking authentication session');
          return;
        }
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Session check error:', error);
        toast.error('Failed to check authentication session');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Check user role when auth state changes
        try {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (roleError) {
            console.error('Error fetching user role:', roleError);
            toast.error('Error fetching user permissions');
          }
        } catch (error) {
          console.error('Auth state change error:', error);
          toast.error('Error updating authentication state');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children({ user, loading })}</>;
};