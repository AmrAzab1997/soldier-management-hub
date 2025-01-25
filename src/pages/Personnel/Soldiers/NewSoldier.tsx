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

const NewSoldierPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rank: "",
    serviceNumber: "",
    unit: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("soldiers").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          rank: formData.rank,
          service_number: formData.serviceNumber,
          unit: formData.unit,
        },
      ]);

      if (error) throw error;

      toast.success("Soldier created successfully");
      navigate("/personnel/soldiers");
    } catch (error) {
      console.error("Error creating soldier:", error);
      toast.error("Failed to create soldier");
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
      navigate("/personnel/soldiers");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Soldier</DialogTitle>
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
            <Label htmlFor="serviceNumber">Service Number</Label>
            <Input
              id="serviceNumber"
              name="serviceNumber"
              value={formData.serviceNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              name="unit"
              value={formData.unit}
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
            <Button type="submit">Create Soldier</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewSoldierPage;