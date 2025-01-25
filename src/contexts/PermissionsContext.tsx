import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Permission, Field, UserRole } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PermissionsContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  hasPermission: (resource: string, action: string) => boolean;
  canManageFields: (entity: string) => boolean;
  updatePermissions: (role: UserRole, permissions: Permission[]) => void;
  customFields: Field[];
  addCustomField: (field: Field) => void;
  updateCustomField: (fieldId: string, field: Field) => void;
  deleteCustomField: (fieldId: string) => void;
}

const defaultPermissions: Record<UserRole, Permission[]> = {
  developer: [
    { 
      resource: '*', 
      actions: ['create', 'read', 'update', 'delete', 'manage_fields']
    }
  ],
  admin: [
    {
      resource: '*',
      actions: ['create', 'read', 'update', 'delete']
    }
  ],
  user: [
    {
      resource: '*',
      actions: ['read']
    }
  ]
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [rolePermissions, setRolePermissions] = useState(defaultPermissions);
  const [customFields, setCustomFields] = useState<Field[]>([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: roleData, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user role:', error);
            toast.error('Error fetching user permissions');
            return;
          }

          if (roleData) {
            setCurrentUser({
              id: session.user.id,
              email: session.user.email!,
              role: roleData.role,
              permissions: defaultPermissions[roleData.role]
            });
          } else {
            // If no role is found, set default user role
            setCurrentUser({
              id: session.user.id,
              email: session.user.email!,
              role: 'user',
              permissions: defaultPermissions['user']
            });
          }
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        toast.error('Failed to fetch user permissions');
      }
    };

    fetchUserRole();
  }, []);

  const hasPermission = (resource: string, action: string) => {
    if (!currentUser) return false;
    
    const userRole = currentUser.role;
    const permissions = rolePermissions[userRole] || [];
    
    return permissions.some(permission => 
      (permission.resource === '*' || permission.resource === resource) &&
      permission.actions.includes(action as any)
    );
  };

  const canManageFields = (entity: string) => {
    if (currentUser?.role === 'developer') {
      return true;
    }
    
    return hasPermission(entity, 'manage_fields');
  };

  const updatePermissions = (role: UserRole, permissions: Permission[]) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: permissions
    }));
  };

  const addCustomField = (field: Field) => {
    setCustomFields(prev => [...prev, field]);
  };

  const updateCustomField = (fieldId: string, updatedField: Field) => {
    setCustomFields(prev => 
      prev.map(field => field.id === fieldId ? updatedField : field)
    );
  };

  const deleteCustomField = (fieldId: string) => {
    setCustomFields(prev => prev.filter(field => field.id !== fieldId));
  };

  return (
    <PermissionsContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        hasPermission,
        canManageFields,
        updatePermissions,
        customFields,
        addCustomField,
        updateCustomField,
        deleteCustomField,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};