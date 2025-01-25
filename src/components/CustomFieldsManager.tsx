import { usePermissions } from '@/contexts/PermissionsContext';
import { useFieldManager } from '@/hooks/useFieldManager';
import { Field } from '@/types/user';
import { FieldsSection } from './CustomFields/FieldsSection';

interface CustomFieldsManagerProps {
  entity: 'officer' | 'soldier' | 'case';
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
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold">Manage Fields for {entity}</h3>
      
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