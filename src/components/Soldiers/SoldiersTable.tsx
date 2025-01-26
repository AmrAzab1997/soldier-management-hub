import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Edit2, Trash2 } from "lucide-react";
import { Soldier } from "@/types/soldier";

interface SoldiersTableProps {
  soldiers: Soldier[];
  onEdit: (soldier: Soldier) => void;
  onDelete: (id: string) => void;
  editingSoldier: Soldier | null;
  onUpdate: (data: Record<string, string>) => void;
  soldierFields: Array<{
    name: string;
    label: string;
    type: "text" | "textarea" | "date" | "email";
    required?: boolean;
  }>;
}

export function SoldiersTable({
  soldiers,
  onEdit,
  onDelete,
  editingSoldier,
  onUpdate,
  soldierFields,
}: SoldiersTableProps) {
  if (!soldiers || soldiers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No soldiers found.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {soldiers.map((soldier) => (
            <TableRow key={soldier.id}>
              <TableCell className="font-medium">{soldier.name}</TableCell>
              <TableCell>{soldier.rank}</TableCell>
              <TableCell>{soldier.unit}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  soldier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {soldier.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(soldier)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(soldier.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingSoldier && (
        <CreateResourceDialog
          title="Edit Soldier"
          description="Update the soldier's details."
          fields={soldierFields}
          onSubmit={onUpdate}
          initialData={{
            name: editingSoldier.name,
            rank: editingSoldier.rank,
            unit: editingSoldier.unit,
            status: editingSoldier.status,
          }}
        />
      )}
    </div>
  );
}