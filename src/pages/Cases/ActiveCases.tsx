import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { DataTableSearch } from "@/components/DataTable/DataTableSearch";
import { DataTableFilters } from "@/components/DataTable/DataTableFilters";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Case } from "@/types/case";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const ActiveCasesPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filters = [
    {
      name: "Priority",
      options: [
        { id: "high", label: "High", value: "high", checked: false },
        { id: "medium", label: "Medium", value: "medium", checked: false },
        { id: "low", label: "Low", value: "low", checked: false },
      ],
    },
    {
      name: "Status",
      options: [
        { id: "open", label: "Open", value: "open", checked: false },
        {
          id: "in-progress",
          label: "In Progress",
          value: "in-progress",
          checked: false,
        },
      ],
    },
  ];

  const handleCreate = (data: Record<string, string>) => {
    const newCase: Case = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      status: data.status as Case["status"],
      priority: data.priority as Case["priority"],
      assignedTo: data.assignedTo,
      createdAt: new Date().toISOString(),
    };
    setCases((prev) => [...prev, newCase]);
    toast({
      title: "Success",
      description: "Case created successfully",
    });
  };

  const handleFilterChange = (groupName: string, optionId: string) => {
    // Filter implementation will go here
    console.log("Filter changed:", groupName, optionId);
  };

  const fields = [
    { name: "title", label: "Title", type: "text" as const, required: true },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
    },
    {
      name: "priority",
      label: "Priority",
      type: "text" as const,
      required: true,
    },
    {
      name: "assignedTo",
      label: "Assigned To",
      type: "text" as const,
      required: true,
    },
  ];

  const filteredCases = cases.filter((case_) =>
    case_.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Active Cases</h1>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-sm">
            <DataTableSearch
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex items-center gap-2">
            <DataTableFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <CreateResourceDialog
              title="Create New Case"
              description="Add a new case to the system"
              fields={fields}
              onSubmit={handleCreate}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        case_.priority === "high"
                          ? "destructive"
                          : case_.priority === "medium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {case_.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{case_.status}</Badge>
                  </TableCell>
                  <TableCell>{case_.assignedTo}</TableCell>
                  <TableCell>
                    {new Date(case_.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default ActiveCasesPage;