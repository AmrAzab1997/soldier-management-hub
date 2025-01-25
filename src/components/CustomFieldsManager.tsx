import { useEffect, useState } from 'react';
import { usePermissions } from '@/contexts/PermissionsContext';
import { Field } from '@/types/user';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CustomFieldForm } from './CustomFields/CustomFieldForm';
import { CustomFieldsList } from './CustomFields/CustomFieldsList';

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

  const handleEditingFieldChange = (field: Partial<Field>) => {
    if (editingField) {
      setEditingField({ ...editingField, ...field });
    }
  };

  const handleNewFieldChange = (field: Partial<Field>) => {
    setNewField({ ...newField, ...field });
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
        <CustomFieldForm
          field={editingField}
          onSubmit={handleUpdateField}
          onCancel={() => setEditingField(null)}
          onChange={handleEditingFieldChange}
          isEditing
        />
      ) : (
        <CustomFieldForm
          field={newField}
          onSubmit={handleAddField}
          onChange={handleNewFieldChange}
        />
      )}

      <div className="mt-8">
        <h4 className="text-md font-medium mb-4">Existing Custom Fields</h4>
        <CustomFieldsList
          fields={customFields}
          onEdit={setEditingField}
          onDelete={handleDeleteField}
        />
      </div>
    </div>
  );
}