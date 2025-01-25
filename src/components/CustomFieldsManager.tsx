import { usePermissions } from '@/contexts/PermissionsContext';
import { useFieldManager } from '@/hooks/useFieldManager';
import { Field } from '@/types/user';
import { FieldsSection } from './CustomFields/FieldsSection';
import { CreateResourceDialog } from './CreateResourceDialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CustomFieldsManagerProps {
  entity: 'officer' | 'soldier' | 'case' | 'custom_list';
}

export function CustomFieldsManager({ entity }: CustomFieldsManagerProps) {
  const { canManageFields } = usePermissions();
  const [isCreatingList, setIsCreatingList] = useState(false);
  const {
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
  } = useFieldManager(entity);

  const handleEditingFieldChange = (field: Partial<Field>) => {
    if (editingField) {
      setEditingField({ ...editingField, ...field });
    }
  };

  const handleNewFieldChange = (field: Partial<Field>) => {
    setNewField({ ...newField, ...field });
  };

  const handleCreateList = async (data: Record<string, string>) => {
    try {
      const { error: listError } = await supabase
        .from('custom_lists')
        .insert([
          {
            name: data.name,
            description: data.description,
          },
        ]);

      if (listError) throw listError;

      toast.success('Custom list created successfully');
      setIsCreatingList(false);
    } catch (error) {
      console.error('Error creating custom list:', error);
      toast.error('Failed to create custom list');
    }
  };

  if (!canManageFields(entity)) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Manage Fields for {entity}</h3>
        {entity === 'custom_list' && (
          <CreateResourceDialog
            title="Create New Custom List"
            description="Create a new custom list with a name and description"
            fields={[
              {
                name: 'name',
                label: 'List Name',
                type: 'text',
                required: true,
              },
              {
                name: 'description',
                label: 'Description',
                type: 'textarea',
                required: false,
              },
            ]}
            onSubmit={handleCreateList}
            open={isCreatingList}
            onOpenChange={setIsCreatingList}
          />
        )}
      </div>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">System Fields</h4>
          <FieldsSection
            fields={systemFields}
            isSystemFields={true}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Custom Fields</h4>
          <FieldsSection
            fields={customFields}
            onEdit={setEditingField}
            onDelete={handleDeleteField}
            editingField={editingField}
            newField={newField}
            onSubmit={editingField ? handleUpdateField : handleAddField}
            onCancel={editingField ? () => setEditingField(null) : undefined}
            onChange={editingField ? handleEditingFieldChange : handleNewFieldChange}
            showForm={true}
          />
        </div>
      </div>
    </div>
  );
}