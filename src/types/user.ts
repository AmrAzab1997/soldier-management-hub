export interface User {
  id: string;
  email: string;
  role: 'developer' | 'admin' | 'user';
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