import { useState } from 'react';
import { usePermissions } from '@/contexts/PermissionsContext';
import { Field } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

interface CustomFieldsManagerProps {
  entity: 'officer' | 'soldier' | 'case';
}

export function CustomFieldsManager({ entity }: CustomFieldsManagerProps) {
  const { canManageFields, customFields, addCustomField, updateCustomField, deleteCustomField } = usePermissions();
  const [newField, setNewField] = useState<Partial<Field>>({
    name: '',
    label: '',
    type: 'text',
    required: false,
    entity,
  });

  if (!canManageFields(entity)) {
    return null;
  }

  const handleAddField = () => {
    if (!newField.name || !newField.label || !newField.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    addCustomField({
      id: Math.random().toString(36).substr(2, 9),
      name: newField.name,
      label: newField.label,
      type: newField.type as Field['type'],
      required: newField.required || false,
      entity,
    });

    setNewField({
      name: '',
      label: '',
      type: 'text',
      required: false,
      entity,
    });

    toast.success('Custom field added successfully');
  };

  const entityFields = customFields.filter(field => field.entity === entity);

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Manage Custom Fields</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fieldName">Field Name</Label>
            <Input
              id="fieldName"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              placeholder="e.g., department"
            />
          </div>
          <div>
            <Label htmlFor="fieldLabel">Field Label</Label>
            <Input
              id="fieldLabel"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              placeholder="e.g., Department"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fieldType">Field Type</Label>
            <Select
              value={newField.type}
              onValueChange={(value) => setNewField({ ...newField, type: value as Field['type'] })}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="email">Email</option>
              <option value="select">Select</option>
            </Select>
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <input
              type="checkbox"
              id="required"
              checked={newField.required}
              onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
              className="rounded border-gray-300"
            />
            <Label htmlFor="required">Required Field</Label>
          </div>
        </div>

        <Button onClick={handleAddField}>Add Field</Button>
      </div>

      <div className="mt-8">
        <h4 className="text-md font-medium mb-4">Existing Custom Fields</h4>
        <div className="space-y-4">
          {entityFields.map((field) => (
            <div key={field.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{field.label}</p>
                <p className="text-sm text-gray-500">Type: {field.type}</p>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    deleteCustomField(field.id);
                    toast.success('Field deleted successfully');
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}