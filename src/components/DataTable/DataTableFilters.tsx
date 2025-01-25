import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

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

interface DataTableFiltersProps {
  filters: FilterGroup[];
  onFilterChange: (groupName: string, optionId: string) => void;
}

export function DataTableFilters({ filters, onFilterChange }: DataTableFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {filters.map((group) => (
          <div key={group.name}>
            <DropdownMenuLabel>{group.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {group.options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={option.checked}
                onCheckedChange={() => onFilterChange(group.name, option.id)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}