import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DataTableSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export function DataTableSearch({ searchTerm, onSearch }: DataTableSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}