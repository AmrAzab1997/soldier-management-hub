import { DataTableSearch } from "@/components/DataTable/DataTableSearch";
import { DataTableFilters } from "@/components/DataTable/DataTableFilters";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

interface CaseToolbarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  filters: {
    name: string;
    options: {
      id: string;
      label: string;
      value: string;
      checked: boolean;
    }[];
  }[];
  onFilterChange: (groupName: string, optionId: string) => void;
  onCreate: (data: Record<string, string>) => void;
  fields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "date" | "email";
    required?: boolean;
  }[];
}

export function CaseToolbar({
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  onCreate,
  fields,
}: CaseToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 max-w-sm">
        <DataTableSearch searchTerm={searchTerm} onSearch={onSearch} />
      </div>
      <div className="flex items-center gap-2">
        <DataTableFilters filters={filters} onFilterChange={onFilterChange} />
        <CreateResourceDialog
          title="Create New Case"
          description="Add a new case to the system"
          fields={fields}
          onSubmit={onCreate}
        />
      </div>
    </div>
  );
}