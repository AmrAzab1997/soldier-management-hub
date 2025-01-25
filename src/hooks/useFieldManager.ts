import { useState, useEffect } from 'react';
import { Field } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useFieldManager(entity: 'officer' | 'soldier' | 'case') {
  const [systemFields, setSystemFields] = useState<Field[]>([]);
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
    console.log('Fetching fields for entity:', entity);
    setIsLoading(true);
    Promise.all([
      fetchSystemFields(),
      fetchCustomFields()
    ]).finally(() => setIsLoading(false));

    setEditingField(null);
    setNewField({
      name: '',
      label: '',
      type: 'text',
      required: false,
      entity,
    });
  }, [entity]);

  const fetchSystemFields = async () => {
    try {
      console.log('Fetching system fields...');
      const { data, error } = await supabase
        .from('entity_fields')
        .select('*')
        .eq('entity_type', entity)
        .eq('is_system', true);

      if (error) {
        console.error('Error fetching system fields:', error);
        throw error;
      }

      console.log('System fields data:', data);

      const fields: Field[] = data.map(field => ({
        id: field.id,
        name: field.field_name,
        label: field.field_label,
        type: field.field_type as Field['type'],
        required: field.is_required || false,
        entity: field.entity_type as 'officer' | 'soldier' | 'case',
        isSystem: true,
        options: field.options || [] // Ensure options is always an array
      }));

      setSystemFields(fields);
    } catch (error) {
      console.error('Error fetching system fields:', error);
      toast.error('Failed to load system fields');
    }
  };

  const fetchCustomFields = async () => {
    try {
      console.log('Fetching custom fields...');
      const { data, error } = await supabase
        .from('custom_fields')
        .select('*')
        .eq('entity_type', entity);

      if (error) {
        console.error('Error fetching custom fields:', error);
        throw error;
      }

      console.log('Custom fields data:', data);

      const fields: Field[] = data.map(field => ({
        id: field.id,
        name: field.field_name,
        label: field.field_label,
        type: field.field_type as Field['type'],
        required: field.is_required || false,
        entity: field.entity_type as 'officer' | 'soldier' | 'case',
        options: field.options || [] // Ensure options is always an array
      }));

      setCustomFields(fields);
    } catch (error) {
      console.error('Error fetching custom fields:', error);
      toast.error('Failed to load custom fields');
    }
  };

  const handleAddField = async () => {
    if (!newField.name || !newField.label || !newField.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      console.log('Adding new custom field:', newField);
      const { error } = await supabase.from('custom_fields').insert([
        {
          entity_type: entity,
          field_name: newField.name,
          field_label: newField.label,
          field_type: newField.type,
          is_required: newField.required,
          options: newField.options
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
      console.log('Updating custom field:', editingField);
      const { error } = await supabase
        .from('custom_fields')
        .update({
          field_name: editingField.name,
          field_label: editingField.label,
          field_type: editingField.type,
          is_required: editingField.required,
          options: editingField.options
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
      console.log('Deleting custom field:', fieldId);
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

  return {
    systemFields,
    customFields,
    isLoading,
    editingField,
    newField,
    setEditingField,
    setNewField,
    handleAddField,
    handleUpdateField,
    handleDeleteField,
  };
}