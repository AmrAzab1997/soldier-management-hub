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

interface CaseTableProps {
  cases: Case[];
  onEdit: (case_: Case) => void;
  onDelete: (id: string) => void;
}

export function CaseTable({ cases, onEdit, onDelete }: CaseTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((case_) => (
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
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(case_)}
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
                        <AlertDialogTitle>Delete Case</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this case? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(case_.id)}
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