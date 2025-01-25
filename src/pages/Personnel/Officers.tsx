import { DataTableSearch } from "@/components/DataTable/DataTableSearch";
import { DataTableFilters } from "@/components/DataTable/DataTableFilters";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Officer {
  id: string;
  name: string;
  rank: string;
  division: string;
  status: "active" | "inactive" | "leave";
  joinDate: string;
}

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
  const [filters, setFilters] = useState([
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

  const fields = [
    { name: "name", label: "Name", type: "text" as const, required: true },
    { name: "rank", label: "Rank", type: "text" as const, required: true },
    { name: "division", label: "Division", type: "text" as const, required: true },
    { name: "joinDate", label: "Join Date", type: "date" as const, required: true },
  ];

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
    // Search filter
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.division.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const activeStatusFilters = filters.find(f => f.name === "Status")?.options.filter(o => o.checked) || [];
    const matchesStatus = activeStatusFilters.length === 0 || 
                         activeStatusFilters.some(f => officer.status === f.value);

    // Division filter
    const activeDivisionFilters = filters.find(f => f.name === "Division")?.options.filter(o => o.checked) || [];
    const matchesDivision = activeDivisionFilters.length === 0 || 
                           activeDivisionFilters.some(f => officer.division.toLowerCase() === f.value);

    return matchesSearch && matchesStatus && matchesDivision;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Officers</h1>
        <CreateResourceDialog
          title="Add New Officer"
          description="Enter the details for the new officer"
          fields={fields}
          onSubmit={handleCreate}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <DataTableSearch
            searchTerm={searchTerm}
            onSearch={(value) => setSearchTerm(value)}
          />
        </div>
        <DataTableFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOfficers.map((officer) => (
              <TableRow key={officer.id}>
                <TableCell className="font-medium">{officer.name}</TableCell>
                <TableCell>{officer.rank}</TableCell>
                <TableCell>{officer.division}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      officer.status === "active"
                        ? "default"
                        : officer.status === "inactive"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {officer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(officer.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedOfficer(officer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Officer</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this officer? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(officer.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOfficer && (
        <CreateResourceDialog
          title="Edit Officer"
          description="Update officer information"
          fields={fields}
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