import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Case } from "@/types/case";
import { useToast } from "@/hooks/use-toast";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { CaseTable } from "@/components/Cases/CaseTable";
import { CaseToolbar } from "@/components/Cases/CaseToolbar";

const CASE_FILTERS = [
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

const CASE_FIELDS = [
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
    name: "status",
    label: "Status",
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

const ActiveCasesPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(CASE_FILTERS);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const { toast } = useToast();

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

  const handleUpdate = (data: Record<string, string>) => {
    if (!selectedCase) return;
    
    setCases((prev) =>
      prev.map((case_) =>
        case_.id === selectedCase.id
          ? {
              ...case_,
              title: data.title,
              description: data.description,
              status: data.status as Case["status"],
              priority: data.priority as Case["priority"],
              assignedTo: data.assignedTo,
            }
          : case_
      )
    );
    setSelectedCase(null);
    toast({
      title: "Success",
      description: "Case updated successfully",
    });
  };

  const handleDelete = (id: string) => {
    setCases((prev) => prev.filter((case_) => case_.id !== id));
    toast({
      title: "Success",
      description: "Case deleted successfully",
    });
  };

  const handleFilterChange = (groupName: string, optionId: string) => {
    setFilters((prev) =>
      prev.map((group) => {
        if (group.name === groupName) {
          return {
            ...group,
            options: group.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, checked: !option.checked };
              }
              return option;
            }),
          };
        }
        return group;
      })
    );
  };

  const filteredCases = cases.filter((case_) => {
    const matchesSearch = case_.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const activeFilters = filters.flatMap((group) =>
      group.options.filter((option) => option.checked)
    );

    if (activeFilters.length === 0) return matchesSearch;

    const matchesFilters = activeFilters.some(
      (filter) =>
        case_.priority === filter.value || case_.status === filter.value
    );

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Active Cases</h1>

        <CaseToolbar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          filters={filters}
          onFilterChange={handleFilterChange}
          onCreate={handleCreate}
          fields={CASE_FIELDS}
        />

        <CaseTable
          cases={filteredCases}
          onEdit={setSelectedCase}
          onDelete={handleDelete}
        />

        {selectedCase && (
          <CreateResourceDialog
            title="Edit Case"
            description="Update case details"
            fields={CASE_FIELDS}
            onSubmit={handleUpdate}
            initialData={{
              title: selectedCase.title,
              description: selectedCase.description,
              priority: selectedCase.priority,
              status: selectedCase.status,
              assignedTo: selectedCase.assignedTo,
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ActiveCasesPage;