import React, { createContext, useContext, useState } from 'react';
import { User, Permission, Field, UserRole } from '@/types/user';

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

  const hasPermission = (resource: string, action: string) => {
    if (!currentUser) return false;
    
    return currentUser.permissions.some(permission => 
      (permission.resource === '*' || permission.resource === resource) &&
      permission.actions.includes(action as any)
    );
  };

  const canManageFields = (entity: string) => {
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