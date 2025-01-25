import React from 'react';
import { Field } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

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
  const [newOption, setNewOption] = React.useState('');

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    
    const currentOptions = Array.isArray(field.options) ? field.options : [];
    onChange({ 
      ...field, 
      options: [...currentOptions, newOption.trim()]
    });
    setNewOption('');
  };

  const handleRemoveOption = (optionToRemove: string) => {
    const currentOptions = Array.isArray(field.options) ? field.options : [];
    onChange({
      ...field,
      options: currentOptions.filter(option => option !== optionToRemove)
    });
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fieldName">Field Name</Label>
          <Input
            id="fieldName"
            value={field.name || ''}
            onChange={(e) => onChange({ ...field, name: e.target.value })}
            placeholder="e.g., department"
          />
        </div>
        <div>
          <Label htmlFor="fieldLabel">Field Label</Label>
          <Input
            id="fieldLabel"
            value={field.label || ''}
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
            <SelectTrigger>
              <SelectValue placeholder="Select field type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="textarea">Text Area</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="required"
            checked={field.required || false}
            onChange={(e) => onChange({ ...field, required: e.target.checked })}
            className="rounded border-gray-300"
          />
          <Label htmlFor="required">Required Field</Label>
        </div>
      </div>

      {field.type === 'select' && (
        <div className="space-y-4">
          <Label>Options</Label>
          <div className="flex gap-2">
            <Input
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Add new option"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddOption();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddOption}
              variant="secondary"
            >
              Add Option
            </Button>
          </div>
          
          <div className="space-y-2">
            {Array.isArray(field.options) && field.options.map((option, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <span>{option}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveOption(option)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

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