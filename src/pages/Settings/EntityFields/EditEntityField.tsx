import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Loader2 } from "lucide-react";

const EditEntityField = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: entityField, isLoading } = useQuery({
    queryKey: ["entityField", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("entity_fields")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Error loading entity field");
        throw error;
      }

      return data;
    },
  });

  const { mutate: updateEntityField } = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const { error } = await supabase
        .from("entity_fields")
        .update({
          field_name: data.field_name,
          field_type: data.field_type,
          field_label: data.field_label,
          entity_type: data.entity_type,
          is_required: data.is_required === "true",
          is_system: data.is_system === "true",
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Entity field updated successfully");
      queryClient.invalidateQueries({ queryKey: ["entityFields"] });
      navigate("/settings/custom-fields");
    },
    onError: (error) => {
      console.error("Error updating entity field:", error);
      toast.error("Failed to update entity field");
    },
  });

  const entityFieldFields = [
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
      name: "is_system",
      label: "System Field",
      type: "text" as const,
      required: true,
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
        <h1 className="text-2xl font-bold">Edit Entity Field</h1>
        <Button variant="outline" onClick={() => navigate("/settings/custom-fields")}>
          Back to Entity Fields
        </Button>
      </div>
      {entityField && (
        <CreateResourceDialog
          title="Edit Entity Field"
          description="Update the entity field's details."
          fields={entityFieldFields}
          onSubmit={updateEntityField}
          initialData={{
            field_name: entityField.field_name,
            field_type: entityField.field_type,
            field_label: entityField.field_label,
            entity_type: entityField.entity_type,
            is_required: String(entityField.is_required),
            is_system: String(entityField.is_system),
          }}
        />
      )}
    </div>
  );
};

export default EditEntityField;