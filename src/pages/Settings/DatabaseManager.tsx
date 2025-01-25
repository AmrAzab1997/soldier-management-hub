import { useState } from 'react';
import { Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { usePermissions } from "@/contexts/PermissionsContext";

interface TableField {
  name: string;
  type: string;
  required: boolean;
}

interface TableDefinition {
  name: string;
  description: string;
  fields: TableField[];
}

export default function DatabaseManager() {
  const { canManageFields } = usePermissions();
  const [tableName, setTableName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<TableField[]>([]);
  const [newField, setNewField] = useState<TableField>({
    name: '',
    type: 'text',
    required: false
  });

  const handleAddField = () => {
    if (!newField.name) {
      toast.error('Field name is required');
      return;
    }
    setFields([...fields, newField]);
    setNewField({ name: '', type: 'text', required: false });
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleCreateTable = async () => {
    if (!tableName) {
      toast.error('Table name is required');
      return;
    }
    if (fields.length === 0) {
      toast.error('At least one field is required');
      return;
    }

    try {
      // Create the table
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          ${fields.map(field => 
            `${field.name} ${field.type.toUpperCase()}${field.required ? ' NOT NULL' : ''}`
          ).join(',\n          ')},
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          created_by UUID REFERENCES auth.users(id)
        );
      `;

      const { error: tableError } = await supabase.rpc('execute_sql', { 
        sql_command: createTableSQL 
      });

      if (tableError) throw tableError;

      // Enable RLS
      const rlsSQL = `
        ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view all records"
        ON ${tableName} FOR SELECT
        TO authenticated
        USING (true);
        
        CREATE POLICY "Developers and admins can manage records"
        ON ${tableName} FOR ALL
        TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('developer', 'admin')
          )
        );
      `;

      const { error: rlsError } = await supabase.rpc('execute_sql', { 
        sql_command: rlsSQL 
      });

      if (rlsError) throw rlsError;

      toast.success('Table created successfully');
      
      // Reset form
      setTableName('');
      setDescription('');
      setFields([]);
      
    } catch (error) {
      console.error('Error creating table:', error);
      toast.error('Failed to create table');
    }
  };

  if (!canManageFields('custom_list')) {
    return (
      <div className="p-6">
        <p className="text-red-500">You don't have permission to manage database tables.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Database className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Database Manager</h1>
      </div>

      <div className="space-y-8 p-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tableName">Table Name</Label>
            <Input
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="e.g., custom_projects"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of this table"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Fields</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fieldName">Field Name</Label>
              <Input
                id="fieldName"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                placeholder="e.g., title"
              />
            </div>
            <div>
              <Label htmlFor="fieldType">Field Type</Label>
              <select
                id="fieldType"
                value={newField.type}
                onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="text">Text</option>
                <option value="integer">Integer</option>
                <option value="boolean">Boolean</option>
                <option value="timestamp">Timestamp</option>
                <option value="jsonb">JSON</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="required">Required</Label>
              </div>
              <Button 
                onClick={handleAddField}
                className="ml-auto"
              >
                Add Field
              </Button>
            </div>
          </div>

          {fields.length > 0 && (
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{field.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({field.type}{field.required ? ', required' : ''})
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveField(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button 
          onClick={handleCreateTable}
          className="w-full"
          size="lg"
        >
          Create Table
        </Button>
      </div>
    </div>
  );
}