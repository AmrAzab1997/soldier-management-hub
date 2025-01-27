import { useState, useEffect } from "react";
import { Case } from "@/types/case";
import { toast } from "sonner";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { CaseTable } from "@/components/Cases/CaseTable";
import { CaseToolbar } from "@/components/Cases/CaseToolbar";
import { supabase } from "@/integrations/supabase/client";

const CASE_FILTERS = [
  {
    name: "Priority",
    options: [
      { id: "high", label: "High", value: "high", checked: false },
      { id: "medium", label: "Medium", value: "medium", checked: false },
      { id: "low", label: "Low", value: "low", checked: false },
    ],
  },
  {
    name: "Status",
    options: [
      { id: "open", label: "Open", value: "open", checked: false },
      {
        id: "in-progress",
        label: "In Progress",
        value: "in-progress",
        checked: false,
      },
    ],
  },
];

const CASE_FIELDS = [
  { name: "title", label: "Title", type: "text" as const, required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    required: true,
  },
  {
    name: "priority",
    label: "Priority",
    type: "text" as const,
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "text" as const,
    required: true,
  },
];

const ActiveCasesPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(CASE_FILTERS);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      console.log("Fetching cases...");
      // First get all cases
      const { data: casesData, error: casesError } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (casesError) throw casesError;

      // Then get the profiles for the created_by users
      const createdByIds = casesData
        .map(c => c.created_by)
        .filter((id): id is string => id !== null);

      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", createdByIds);

      if (profilesError) throw profilesError;

      // Create a map of user IDs to names for quick lookup
      const userNameMap = new Map(
        profilesData.map(p => [
          p.id,
          `${p.first_name || ""} ${p.last_name || ""}`.trim() || "Unknown"
        ])
      );

      const formattedCases: Case[] = casesData.map((case_) => ({
        id: case_.id,
        title: case_.title,
        description: case_.description || "",
        status: case_.status as Case["status"],
        priority: case_.priority as Case["priority"],
        createdByName: case_.created_by ? userNameMap.get(case_.created_by) || "Unknown" : "Unknown",
        createdAt: case_.created_at,
      }));

      console.log("Formatted cases:", formattedCases);
      setCases(formattedCases);
    } catch (error) {
      console.error("Error fetching cases:", error);
      toast.error("Failed to load cases");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: Record<string, string>) => {
    try {
      // Get the current user's ID for assignment
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to create a case");
        return;
      }

      const { error } = await supabase.from("cases").insert([
        {
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          assigned_to: user.id,
          created_by: user.id, // Set the created_by field to the current user's ID
          case_number: `CASE-${Date.now()}`,
        },
      ]);

      if (error) throw error;

      toast.success("Case created successfully");
      fetchCases();
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case");
    }
  };

  const handleUpdate = async (data: Record<string, string>) => {
    if (!selectedCase) return;
    
    try {
      const { error } = await supabase
        .from("cases")
        .update({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          // Keep the existing assigned_to value
        })
        .eq("id", selectedCase.id);

      if (error) throw error;

      toast.success("Case updated successfully");
      setSelectedCase(null);
      fetchCases();
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("cases").delete().eq("id", id);

      if (error) throw error;

      toast.success("Case deleted successfully");
      fetchCases();
    } catch (error) {
      console.error("Error deleting case:", error);
      toast.error("Failed to delete case");
    }
  };

  const handleFilterChange = (groupName: string, optionId: string) => {
    setFilters((prev) =>
      prev.map((group) => {
        if (group.name === groupName) {
          return {
            ...group,
            options: group.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, checked: !option.checked };
              }
              return option;
            }),
          };
        }
        return group;
      })
    );
  };

  const filteredCases = cases.filter((case_) => {
    const matchesSearch = case_.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const activeFilters = filters.flatMap((group) =>
      group.options.filter((option) => option.checked)
    );

    if (activeFilters.length === 0) return matchesSearch;

    const matchesFilters = activeFilters.some(
      (filter) =>
        case_.priority === filter.value || case_.status === filter.value
    );

    return matchesSearch && matchesFilters;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Active Cases</h1>

      <CaseToolbar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        onCreate={handleCreate}
        fields={CASE_FIELDS}
      />

      <CaseTable
        cases={filteredCases}
        onEdit={setSelectedCase}
        onDelete={handleDelete}
      />

      {selectedCase && (
        <CreateResourceDialog
          title="Edit Case"
          description="Update case details"
          fields={CASE_FIELDS}
          onSubmit={handleUpdate}
          initialData={{
            title: selectedCase.title,
            description: selectedCase.description,
            priority: selectedCase.priority,
            status: selectedCase.status,
          }}
          open={!!selectedCase}
          onOpenChange={(open) => !open && setSelectedCase(null)}
        />
      )}
    </div>
  );
};

export default ActiveCasesPage;