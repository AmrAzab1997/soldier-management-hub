export type UserRole = 'developer' | 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'manage_fields')[];
}

export interface Field {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'email' | 'select' | 'textarea';
  required: boolean;
  options?: any[];
  entity: 'officer' | 'soldier' | 'case' | 'custom_list';
  isSystem?: boolean;
}

export interface CustomList {
  id: string;
  name: string;
  description?: string;
  fields: Field[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}