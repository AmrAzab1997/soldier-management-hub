import { useEffect, useState } from 'react';
import { usePermissions } from '@/contexts/PermissionsContext';
import { Field } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CustomFieldsManagerProps {
  entity: 'officer' | 'soldier' | 'case';
}

export function CustomFieldsManager({ entity }: CustomFieldsManagerProps) {
  const { canManageFields } = usePermissions();
  const [customFields, setCustomFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [newField, setNewField] = useState<Partial<Field>>({
    name: '',
    label: '',
    type: 'text',
    required: false,
    entity,
  });

  useEffect(() => {
    fetchCustomFields();
  }, [entity]);

  const fetchCustomFields = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_fields')
        .select('*')
        .eq('entity_type', entity);

      if (error) throw error;

      const fields: Field[] = data.map(field => ({
        id: field.id,
        name: field.field_name,
        label: field.field_label,
        type: field.field_type as Field['type'],
        required: field.is_required || false,
        entity: field.entity_type as 'officer' | 'soldier' | 'case',
      }));

      setCustomFields(fields);
    } catch (error) {
      console.error('Error fetching custom fields:', error);
      toast.error('Failed to load custom fields');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddField = async () => {
    if (!newField.name || !newField.label || !newField.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase.from('custom_fields').insert([
        {
          entity_type: entity,
          field_name: newField.name,
          field_label: newField.label,
          field_type: newField.type,
          is_required: newField.required,
        },
      ]);

      if (error) throw error;

      toast.success('Custom field added successfully');
      fetchCustomFields();
      setNewField({
        name: '',
        label: '',
        type: 'text',
        required: false,
        entity,
      });
    } catch (error) {
      console.error('Error adding custom field:', error);
      toast.error('Failed to add custom field');
    }
  };

  const handleUpdateField = async () => {
    if (!editingField) return;

    try {
      const { error } = await supabase
        .from('custom_fields')
        .update({
          field_name: editingField.name,
          field_label: editingField.label,
          field_type: editingField.type,
          is_required: editingField.required,
        })
        .eq('id', editingField.id);

      if (error) throw error;

      toast.success('Field updated successfully');
      setEditingField(null);
      fetchCustomFields();
    } catch (error) {
      console.error('Error updating field:', error);
      toast.error('Failed to update field');
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    try {
      const { error } = await supabase
        .from('custom_fields')
        .delete()
        .eq('id', fieldId);

      if (error) throw error;

      toast.success('Field deleted successfully');
      fetchCustomFields();
    } catch (error) {
      console.error('Error deleting field:', error);
      toast.error('Failed to delete field');
    }
  };

  if (!canManageFields(entity)) {
    return null;
  }

  if (isLoading) {
    return <div>Loading custom fields...</div>;
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Manage Custom Fields for {entity}</h3>
      
      {editingField ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="editFieldName">Field Name</Label>
              <Input
                id="editFieldName"
                value={editingField.name}
                onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editFieldLabel">Field Label</Label>
              <Input
                id="editFieldLabel"
                value={editingField.label}
                onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="editFieldType">Field Type</Label>
              <Select
                value={editingField.type}
                onValueChange={(value) => setEditingField({ ...editingField, type: value as Field['type'] })}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="email">Email</option>
                <option value="select">Select</option>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="editRequired"
                checked={editingField.required}
                onChange={(e) => setEditingField({ ...editingField, required: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="editRequired">Required Field</Label>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleUpdateField}>Save Changes</Button>
            <Button variant="outline" onClick={() => setEditingField(null)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fieldName">Field Name</Label>
              <Input
                id="fieldName"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                placeholder="e.g., department"
              />
            </div>
            <div>
              <Label htmlFor="fieldLabel">Field Label</Label>
              <Input
                id="fieldLabel"
                value={newField.label}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                placeholder="e.g., Department"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fieldType">Field Type</Label>
              <Select
                value={newField.type}
                onValueChange={(value) => setNewField({ ...newField, type: value as Field['type'] })}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="email">Email</option>
                <option value="select">Select</option>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="required"
                checked={newField.required}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="required">Required Field</Label>
            </div>
          </div>

          <Button onClick={handleAddField}>Add Field</Button>
        </div>
      )}

      <div className="mt-8">
        <h4 className="text-md font-medium mb-4">Existing Custom Fields</h4>
        <div className="space-y-4">
          {customFields.map((field) => (
            <div key={field.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{field.label}</p>
                <p className="text-sm text-gray-500">
                  Type: {field.type} | Name: {field.name} | Required: {field.required ? 'Yes' : 'No'}
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingField(field)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteField(field.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}