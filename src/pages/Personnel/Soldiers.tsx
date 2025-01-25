import { useState } from "react";
import { toast } from "sonner";
import { SoldiersToolbar } from "@/components/Soldiers/SoldiersToolbar";
import { SoldiersTable } from "@/components/Soldiers/SoldiersTable";
import { Soldier } from "@/types/soldier";

const INITIAL_DATA: Soldier[] = [
  {
    id: "1",
    name: "John Doe",
    rank: "Sergeant",
    unit: "1st Infantry",
    status: "Active",
  },
];

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
  const [soldiers, setSoldiers] = useState<Soldier[]>(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(SOLDIER_FILTERS);
  const [editingSoldier, setEditingSoldier] = useState<Soldier | null>(null);

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

  const handleCreate = (data: Record<string, string>) => {
    const newSoldier: Soldier = {
      id: Date.now().toString(),
      ...data,
    };
    setSoldiers((prev) => [...prev, newSoldier]);
    toast.success("Soldier added successfully");
  };

  const handleEdit = (soldier: Soldier) => {
    setEditingSoldier(soldier);
  };

  const handleUpdate = (data: Record<string, string>) => {
    setSoldiers((prev) =>
      prev.map((soldier) =>
        soldier.id === editingSoldier?.id
          ? { ...soldier, ...data }
          : soldier
      )
    );
    setEditingSoldier(null);
    toast.success("Soldier updated successfully");
  };

  const handleDelete = (id: string) => {
    setSoldiers((prev) => prev.filter((soldier) => soldier.id !== id));
    toast.success("Soldier deleted successfully");
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
        onCreateSoldier={handleCreate}
        soldierFields={SOLDIER_FIELDS}
      />

      <SoldiersTable
        soldiers={filteredSoldiers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        editingSoldier={editingSoldier}
        onUpdate={handleUpdate}
        soldierFields={SOLDIER_FIELDS}
      />
    </div>
  );
}