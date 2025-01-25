import { Field } from '@/types/user';
import { CustomFieldForm } from './CustomFieldForm';
import { CustomFieldsList } from './CustomFieldsList';

interface FieldsSectionProps {
  title: string;
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
  title,
  fields,
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
      <h4 className="text-lg font-semibold">{title}</h4>
      
      {showForm && !isSystemFields && (
        <div className="mb-4">
          <CustomFieldForm
            field={editingField || newField!}
            onSubmit={onSubmit!}
            onCancel={onCancel}
            onChange={onChange!}
            isEditing={!!editingField}
          />
        </div>
      )}

      <div className="mt-4">
        <CustomFieldsList
          fields={fields}
          onEdit={onEdit!}
          onDelete={onDelete!}
          isSystemFields={isSystemFields}
        />
      </div>
    </div>
  );
}