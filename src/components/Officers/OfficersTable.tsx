import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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

interface OfficersTableProps {
  officers: Officer[];
  onEdit: (officer: Officer) => void;
  onDelete: (id: string) => void;
}

export function OfficersTable({ officers, onEdit, onDelete }: OfficersTableProps) {
  return (
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
          {officers.map((officer) => (
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
                    onClick={() => onEdit(officer)}
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
                          onClick={() => onDelete(officer.id)}
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
  );
}