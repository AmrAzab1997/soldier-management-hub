import { Field } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface CustomFieldsListProps {
  fields: Field[];
  onEdit: (field: Field) => void;
  onDelete: (fieldId: string) => void;
  isSystemFields?: boolean;
}

export function CustomFieldsList({ fields = [], onEdit, onDelete, isSystemFields = false }: CustomFieldsListProps) {
  if (fields.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 italic text-center">
          No {isSystemFields ? 'system' : 'custom'} fields available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <div 
          key={field.id} 
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div>
            <p className="font-medium">{field.label}</p>
            <p className="text-sm text-gray-500">
              Type: {field.type} | Name: {field.name} | Required: {field.required ? 'Yes' : 'No'}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(field)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            {!isSystemFields && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(field.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}