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
  type: 'text' | 'number' | 'date' | 'email' | 'select';
  required: boolean;
  options?: string[]; // For select fields
  entity: 'officer' | 'soldier' | 'case';
}