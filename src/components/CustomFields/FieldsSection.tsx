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
    <div className="mt-8">
      <h4 className="text-md font-medium mb-4">{title}</h4>
      
      {showForm && (
        <CustomFieldForm
          field={editingField || newField!}
          onSubmit={onSubmit!}
          onCancel={onCancel}
          onChange={onChange!}
          isEditing={!!editingField}
        />
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