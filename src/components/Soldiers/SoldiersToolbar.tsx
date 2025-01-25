import { DataTableSearch } from "@/components/DataTable/DataTableSearch";
import { DataTableFilters } from "@/components/DataTable/DataTableFilters";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { FilterGroup } from "@/types/soldier";

interface SoldiersToolbarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  filters: FilterGroup[];
  onFilterChange: (groupName: string, optionId: string) => void;
  onCreateSoldier: (data: Record<string, string>) => void;
  soldierFields: Array<{
    name: string;
    label: string;
    type: "text" | "textarea" | "date" | "email";
    required?: boolean;
  }>;
}

export function SoldiersToolbar({
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  onCreateSoldier,
  soldierFields,
}: SoldiersToolbarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <DataTableSearch searchTerm={searchTerm} onSearch={onSearch} />
      </div>
      <DataTableFilters filters={filters} onFilterChange={onFilterChange} />
      <CreateResourceDialog
        title="Add New Soldier"
        description="Enter the details of the new soldier."
        fields={soldierFields}
        onSubmit={onCreateSoldier}
      />
    </div>
  );
}