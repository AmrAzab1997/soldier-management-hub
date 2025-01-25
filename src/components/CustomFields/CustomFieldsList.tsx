import { Field } from '@/types/user';
import { Button } from '@/components/ui/button';

interface CustomFieldsListProps {
  fields: Field[];
  onEdit: (field: Field) => void;
  onDelete: (fieldId: string) => void;
  isSystemFields?: boolean;
}

export function CustomFieldsList({ fields, onEdit, onDelete, isSystemFields = false }: CustomFieldsListProps) {
  console.log('Rendering CustomFieldsList with fields:', fields);
  
  if (!Array.isArray(fields)) {
    console.error('Fields is not an array:', fields);
    return null;
  }

  return (
    <div className="space-y-4">
      {fields.length > 0 ? (
        fields.map((field) => (
          <div key={field.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-medium">{field.label}</p>
              <p className="text-sm text-gray-500">
                Type: {field.type} | Name: {field.name} | Required: {field.required ? 'Yes' : 'No'}
              </p>
            </div>
            {!isSystemFields && (
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(field)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(field.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic text-center py-4">
          No {isSystemFields ? 'system' : 'custom'} fields found.
        </p>
      )}
    </div>
  );
}