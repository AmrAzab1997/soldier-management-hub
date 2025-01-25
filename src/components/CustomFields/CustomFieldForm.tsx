import { Field } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface CustomFieldFormProps {
  field: Partial<Field>;
  onSubmit: () => void;
  onCancel?: () => void;
  onChange: (field: Partial<Field>) => void;
  isEditing?: boolean;
}

export function CustomFieldForm({ 
  field, 
  onSubmit, 
  onCancel, 
  onChange,
  isEditing = false 
}: CustomFieldFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fieldName">Field Name</Label>
          <Input
            id="fieldName"
            value={field.name}
            onChange={(e) => onChange({ ...field, name: e.target.value })}
            placeholder="e.g., department"
          />
        </div>
        <div>
          <Label htmlFor="fieldLabel">Field Label</Label>
          <Input
            id="fieldLabel"
            value={field.label}
            onChange={(e) => onChange({ ...field, label: e.target.value })}
            placeholder="e.g., Department"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fieldType">Field Type</Label>
          <Select
            value={field.type}
            onValueChange={(value) => onChange({ ...field, type: value as Field['type'] })}
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
            checked={field.required}
            onChange={(e) => onChange({ ...field, required: e.target.checked })}
            className="rounded border-gray-300"
          />
          <Label htmlFor="required">Required Field</Label>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button onClick={onSubmit}>
          {isEditing ? 'Save Changes' : 'Add Field'}
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}