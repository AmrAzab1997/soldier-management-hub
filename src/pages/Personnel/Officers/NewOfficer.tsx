import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NewOfficerPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rank: "",
    badgeNumber: "",
    department: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("officers").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          rank: formData.rank,
          badge_number: formData.badgeNumber,
          department: formData.department,
        },
      ]);

      if (error) throw error;

      toast.success("Officer created successfully");
      navigate("/personnel/officers");
    } catch (error) {
      console.error("Error creating officer:", error);
      toast.error("Failed to create officer");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      navigate("/personnel/officers");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Officer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rank">Rank</Label>
            <Input
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="badgeNumber">Badge Number</Label>
            <Input
              id="badgeNumber"
              name="badgeNumber"
              value={formData.badgeNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Officer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOfficerPage;