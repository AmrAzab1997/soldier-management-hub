import { useState } from "react";
import { toast } from "sonner";
import { SoldiersToolbar } from "@/components/Soldiers/SoldiersToolbar";
import { SoldiersTable } from "@/components/Soldiers/SoldiersTable";
import { Soldier } from "@/types/soldier";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const SOLDIER_FILTERS = [
  {
    name: "Rank",
    options: [
      { id: "sergeant", label: "Sergeant", value: "Sergeant", checked: false },
      { id: "corporal", label: "Corporal", value: "Corporal", checked: false },
    ],
  },
  {
    name: "Status",
    options: [
      { id: "active", label: "Active", value: "Active", checked: false },
      { id: "inactive", label: "Inactive", value: "Inactive", checked: false },
    ],
  },
];

const SOLDIER_FIELDS = [
  { name: "name", label: "Full Name", type: "text" as const, required: true },
  { name: "rank", label: "Rank", type: "text" as const, required: true },
  { name: "unit", label: "Unit", type: "text" as const, required: true },
  { name: "status", label: "Status", type: "text" as const, required: true },
];

export default function SoldiersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(SOLDIER_FILTERS);
  const [editingSoldier, setEditingSoldier] = useState<Soldier | null>(null);
  const queryClient = useQueryClient();

  const { data: soldiers = [], isLoading } = useQuery({
    queryKey: ["soldiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soldiers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch soldiers");
        throw error;
      }

      return data.map((soldier) => ({
        id: soldier.id,
        name: `${soldier.first_name} ${soldier.last_name}`,
        rank: soldier.rank,
        unit: soldier.unit || "",
        status: soldier.status || "Active",
      }));
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const { error } = await supabase.from("soldiers").insert([
        {
          first_name: data.name.split(" ")[0],
          last_name: data.name.split(" ").slice(1).join(" "),
          rank: data.rank,
          unit: data.unit,
          status: data.status,
          service_number: Math.random().toString(36).substring(7).toUpperCase(),
          created_by: (await supabase.auth.getUser()).data.user?.id,
        },
      ]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["soldiers"] });
      toast.success("Soldier added successfully");
    },
    onError: () => {
      toast.error("Failed to add soldier");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      if (!editingSoldier) return;

      const { error } = await supabase
        .from("soldiers")
        .update({
          first_name: data.name.split(" ")[0],
          last_name: data.name.split(" ").slice(1).join(" "),
          rank: data.rank,
          unit: data.unit,
          status: data.status,
        })
        .eq("id", editingSoldier.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["soldiers"] });
      setEditingSoldier(null);
      toast.success("Soldier updated successfully");
    },
    onError: () => {
      toast.error("Failed to update soldier");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("soldiers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["soldiers"] });
      toast.success("Soldier deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete soldier");
    },
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (groupName: string, optionId: string) => {
    setFilters(
      filters.map((group) => {
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

  const filteredSoldiers = soldiers.filter((soldier) => {
    const matchesSearch = soldier.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const activeFilters = filters.flatMap((group) =>
      group.options.filter((option) => option.checked)
    );

    if (activeFilters.length === 0) return matchesSearch;

    const matchesFilters = activeFilters.some(
      (filter) =>
        soldier.rank === filter.value || soldier.status === filter.value
    );

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Soldiers Management</h2>
      </div>

      <SoldiersToolbar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        onCreateSoldier={(data) => createMutation.mutate(data)}
        soldierFields={SOLDIER_FIELDS}
      />

      <SoldiersTable
        soldiers={filteredSoldiers}
        onEdit={setEditingSoldier}
        onDelete={(id) => deleteMutation.mutate(id)}
        editingSoldier={editingSoldier}
        onUpdate={(data) => updateMutation.mutate(data)}
        soldierFields={SOLDIER_FIELDS}
      />
    </div>
  );
}