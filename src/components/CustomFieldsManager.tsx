import { usePermissions } from '@/contexts/PermissionsContext';
import { useFieldManager } from '@/hooks/useFieldManager';
import { Field } from '@/types/user';
import { FieldsSection } from './CustomFields/FieldsSection';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface CustomFieldsManagerProps {
  entity: 'officer' | 'soldier' | 'case' | 'custom_list';
}

export function CustomFieldsManager({ entity }: CustomFieldsManagerProps) {
  const { canManageFields } = usePermissions();
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

  console.log('CustomFieldsManager - Entity:', entity);
  const hasPermission = canManageFields(entity);
  console.log('CustomFieldsManager - Has permission:', hasPermission);

  const handleEditingFieldChange = (field: Partial<Field>) => {
    if (editingField) {
      setEditingField({ ...editingField, ...field });
    }
  };

  const handleNewFieldChange = (field: Partial<Field>) => {
    setNewField({ ...newField, ...field });
  };

  const handleSubmit = async () => {
    try {
      if (!hasPermission) {
        toast.error('You do not have permission to manage fields');
        return;
      }

      if (editingField) {
        await handleUpdateField();
        toast.success('Field updated successfully');
      } else {
        await handleAddField();
        toast.success('Field added successfully');
      }
    } catch (error) {
      console.error('Error managing field:', error);
      toast.error('Failed to manage field');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">You don't have permission to manage fields for this entity.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Manage Fields for {entity}</h3>
        <Button
          onClick={() => {
            setEditingField(null);
            setNewField({
              name: '',
              label: '',
              type: 'text',
              required: false,
              entity,
            });
          }}
          variant="outline"
        >
          Reset Form
        </Button>
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
            onSubmit={handleSubmit}
            onCancel={editingField ? () => setEditingField(null) : undefined}
            onChange={editingField ? handleEditingFieldChange : handleNewFieldChange}
            showForm={true}
          />
        </div>
      </div>
    </div>
  );
}