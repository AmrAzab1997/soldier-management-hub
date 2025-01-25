import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Loader2 } from "lucide-react";

const EditCustomField = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: customField, isLoading } = useQuery({
    queryKey: ["customField", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_fields")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Error loading custom field");
        throw error;
      }

      return data;
    },
  });

  const { mutate: updateCustomField } = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const { error } = await supabase
        .from("custom_fields")
        .update({
          field_name: data.field_name,
          field_type: data.field_type,
          field_label: data.field_label,
          entity_type: data.entity_type,
          is_required: data.is_required === "true",
          options: data.options ? JSON.parse(data.options) : null,
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Custom field updated successfully");
      queryClient.invalidateQueries({ queryKey: ["customFields"] });
      navigate("/settings/custom-fields");
    },
    onError: (error) => {
      console.error("Error updating custom field:", error);
      toast.error("Failed to update custom field");
    },
  });

  const customFieldFields = [
    {
      name: "field_name",
      label: "Field Name",
      type: "text" as const,
      required: true,
    },
    {
      name: "field_type",
      label: "Field Type",
      type: "text" as const,
      required: true,
    },
    {
      name: "field_label",
      label: "Field Label",
      type: "text" as const,
      required: true,
    },
    {
      name: "entity_type",
      label: "Entity Type",
      type: "text" as const,
      required: true,
    },
    {
      name: "is_required",
      label: "Required",
      type: "text" as const,
      required: true,
    },
    {
      name: "options",
      label: "Options (JSON)",
      type: "textarea" as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Custom Field</h1>
        <Button variant="outline" onClick={() => navigate("/settings/custom-fields")}>
          Back to Custom Fields
        </Button>
      </div>
      {customField && (
        <CreateResourceDialog
          title="Edit Custom Field"
          description="Update the custom field's details."
          fields={customFieldFields}
          onSubmit={updateCustomField}
          initialData={{
            field_name: customField.field_name,
            field_type: customField.field_type,
            field_label: customField.field_label,
            entity_type: customField.entity_type,
            is_required: String(customField.is_required),
            options: customField.options ? JSON.stringify(customField.options) : "",
          }}
        />
      )}
    </div>
  );
};

export default EditCustomField;