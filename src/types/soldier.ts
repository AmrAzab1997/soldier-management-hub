export interface Soldier {
  id: string;
  name: string;
  rank: string;
  unit: string;
  status: string;
}

export interface FilterGroup {
  name: string;
  options: {
    id: string;
    label: string;
    value: string;
    checked: boolean;
  }[];
}