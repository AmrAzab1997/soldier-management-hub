import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { OfficersTable } from "@/components/Officers/OfficersTable";
import { OfficersToolbar } from "@/components/Officers/OfficersToolbar";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Officer, FilterGroup } from "@/types/officer";

const mockOfficers: Officer[] = [
  {
    id: "1",
    name: "John Smith",
    rank: "Captain",
    division: "Investigation",
    status: "active",
    joinDate: "2020-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    rank: "Lieutenant",
    division: "Patrol",
    status: "active",
    joinDate: "2019-03-22",
  },
];

export default function OfficersPage() {
  const { toast } = useToast();
  const [officers, setOfficers] = useState<Officer[]>(mockOfficers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [filters, setFilters] = useState<FilterGroup[]>([
    {
      name: "Status",
      options: [
        { id: "1", label: "Active", value: "active", checked: false },
        { id: "2", label: "Inactive", value: "inactive", checked: false },
        { id: "3", label: "On Leave", value: "leave", checked: false },
      ],
    },
    {
      name: "Division",
      options: [
        { id: "1", label: "Investigation", value: "investigation", checked: false },
        { id: "2", label: "Patrol", value: "patrol", checked: false },
        { id: "3", label: "Administration", value: "administration", checked: false },
      ],
    },
  ]);

  const handleCreate = (data: Record<string, string>) => {
    const newOfficer: Officer = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      rank: data.rank,
      division: data.division,
      status: "active",
      joinDate: data.joinDate,
    };
    setOfficers([...officers, newOfficer]);
    toast({
      title: "Officer Created",
      description: "New officer has been added successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setOfficers(officers.filter((officer) => officer.id !== id));
    toast({
      title: "Officer Deleted",
      description: "Officer has been removed successfully.",
    });
  };

  const handleEdit = (data: Record<string, string>) => {
    if (!selectedOfficer) return;
    
    setOfficers(
      officers.map((o) =>
        o.id === selectedOfficer.id
          ? {
              ...o,
              ...data,
            }
          : o
      )
    );
    setSelectedOfficer(null);
    toast({
      title: "Officer Updated",
      description: "Officer information has been updated successfully.",
    });
  };

  const handleFilterChange = (groupName: string, optionId: string) => {
    setFilters(
      filters.map((group) =>
        group.name === groupName
          ? {
              ...group,
              options: group.options.map((option) =>
                option.id === optionId
                  ? { ...option, checked: !option.checked }
                  : option
              ),
            }
          : group
      )
    );
  };

  // Filter and search logic
  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.division.toLowerCase().includes(searchTerm.toLowerCase());

    const activeStatusFilters = filters.find(f => f.name === "Status")?.options.filter(o => o.checked) || [];
    const matchesStatus = activeStatusFilters.length === 0 || 
                         activeStatusFilters.some(f => officer.status === f.value);

    const activeDivisionFilters = filters.find(f => f.name === "Division")?.options.filter(o => o.checked) || [];
    const matchesDivision = activeDivisionFilters.length === 0 || 
                           activeDivisionFilters.some(f => officer.division.toLowerCase() === f.value);

    return matchesSearch && matchesStatus && matchesDivision;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <OfficersToolbar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        onCreateOfficer={handleCreate}
      />

      <OfficersTable
        officers={filteredOfficers}
        onEdit={setSelectedOfficer}
        onDelete={handleDelete}
      />

      {selectedOfficer && (
        <CreateResourceDialog
          title="Edit Officer"
          description="Update officer information"
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            { name: "rank", label: "Rank", type: "text", required: true },
            { name: "division", label: "Division", type: "text", required: true },
            { name: "joinDate", label: "Join Date", type: "date", required: true },
          ]}
          onSubmit={handleEdit}
          initialData={{
            name: selectedOfficer.name,
            rank: selectedOfficer.rank,
            division: selectedOfficer.division,
            joinDate: selectedOfficer.joinDate,
          }}
          open={!!selectedOfficer}
          onOpenChange={(open) => !open && setSelectedOfficer(null)}
        />
      )}
    </div>
  );
}