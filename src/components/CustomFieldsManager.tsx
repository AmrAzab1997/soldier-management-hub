import { usePermissions } from '@/contexts/PermissionsContext';
import { useFieldManager } from '@/hooks/useFieldManager';
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
    return <div>Loading fields...</div>;
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Manage Fields for {entity}</h3>
      
      <FieldsSection
        title="System Fields"
        fields={systemFields}
        isSystemFields={true}
        onEdit={() => {}}
        onDelete={() => {}}
      />

      <FieldsSection
        title="Custom Fields"
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
  );
}