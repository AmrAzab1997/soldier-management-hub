import { useState } from "react";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { DataTableSearch } from "@/components/DataTable/DataTableSearch";
import { DataTableFilters } from "@/components/DataTable/DataTableFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Soldier {
  id: string;
  name: string;
  rank: string;
  unit: string;
  status: string;
}

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
      name: data.name,
      rank: data.rank,
      unit: data.unit,
      status: data.status,
    };
    setSoldiers((prev) => [...prev, newSoldier]);
    toast.success("Soldier added successfully");
  };

  const handleEdit = (soldier: Soldier) => {
    // Convert Soldier to Record<string, string> by omitting the id field
    const { id, ...soldierData } = soldier;
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
        <CreateResourceDialog
          title="Add New Soldier"
          description="Enter the details of the new soldier."
          fields={SOLDIER_FIELDS}
          onSubmit={handleCreate}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <DataTableSearch searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
        <DataTableFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSoldiers.map((soldier) => (
            <TableRow key={soldier.id}>
              <TableCell>{soldier.name}</TableCell>
              <TableCell>{soldier.rank}</TableCell>
              <TableCell>{soldier.unit}</TableCell>
              <TableCell>{soldier.status}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(soldier)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(soldier.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingSoldier && (
        <CreateResourceDialog
          title="Edit Soldier"
          description="Update the soldier's details."
          fields={SOLDIER_FIELDS}
          onSubmit={handleUpdate}
          initialData={{
            name: editingSoldier.name,
            rank: editingSoldier.rank,
            unit: editingSoldier.unit,
            status: editingSoldier.status,
          }}
        />
      )}
    </div>
  );
}