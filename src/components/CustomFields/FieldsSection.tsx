import { Field } from '@/types/user';
import { CustomFieldForm } from './CustomFieldForm';
import { CustomFieldsList } from './CustomFieldsList';

interface FieldsSectionProps {
  fields: Field[];
  onEdit?: (field: Field) => void;
  onDelete?: (fieldId: string) => void;
  isSystemFields?: boolean;
  editingField?: Field | null;
  newField?: Partial<Field>;
  onSubmit?: () => void;
  onCancel?: () => void;
  onChange?: (field: Partial<Field>) => void;
  showForm?: boolean;
}

export function FieldsSection({
  fields = [],
  onEdit,
  onDelete,
  isSystemFields = false,
  editingField,
  newField,
  onSubmit,
  onCancel,
  onChange,
  showForm = false,
}: FieldsSectionProps) {
  return (
    <div className="space-y-4">
      {showForm && !isSystemFields && (
        <CustomFieldForm
          field={editingField || newField!}
          onSubmit={onSubmit!}
          onCancel={onCancel}
          onChange={onChange!}
          isEditing={!!editingField}
        />
      )}

      <CustomFieldsList
        fields={fields}
        onEdit={onEdit!}
        onDelete={onDelete!}
        isSystemFields={isSystemFields}
      />
    </div>
  );
}