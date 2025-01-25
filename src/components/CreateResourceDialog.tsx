import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "email" | "select";
  required?: boolean;
  options?: SelectOption[];
}

interface CreateResourceDialogProps {
  title: string;
  description: string;
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  initialData?: Record<string, string>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateResourceDialog({
  title,
  description,
  fields,
  onSubmit,
  initialData,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: CreateResourceDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setInternalOpen;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    onOpenChange?.(false);
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
          />
        );
      case "select":
        return (
          <Select
            value={formData[field.name] || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                [field.name]: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {!initialData && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {renderField(field)}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}