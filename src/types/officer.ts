export interface Officer {
  id: string;
  name: string;
  rank: string;
  division: string;
  status: "active" | "inactive" | "leave";
  joinDate: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}

export interface FilterGroup {
  name: string;
  options: FilterOption[];
}