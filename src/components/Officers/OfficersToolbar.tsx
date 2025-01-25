import { DataTableSearch } from "@/components/DataTable/DataTableSearch";
import { DataTableFilters } from "@/components/DataTable/DataTableFilters";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

interface FilterOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}

interface FilterGroup {
  name: string;
  options: FilterOption[];
}

interface OfficersToolbarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  filters: FilterGroup[];
  onFilterChange: (groupName: string, optionId: string) => void;
  onCreateOfficer: (data: Record<string, string>) => void;
}

export function OfficersToolbar({
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  onCreateOfficer,
}: OfficersToolbarProps) {
  const fields = [
    { name: "name", label: "Name", type: "text" as const, required: true },
    { name: "rank", label: "Rank", type: "text" as const, required: true },
    { name: "division", label: "Division", type: "text" as const, required: true },
    { name: "joinDate", label: "Join Date", type: "date" as const, required: true },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Officers</h1>
        <CreateResourceDialog
          title="Add New Officer"
          description="Enter the details for the new officer"
          fields={fields}
          onSubmit={onCreateOfficer}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <DataTableSearch
            searchTerm={searchTerm}
            onSearch={onSearch}
          />
        </div>
        <DataTableFilters filters={filters} onFilterChange={onFilterChange} />
      </div>
    </>
  );
}