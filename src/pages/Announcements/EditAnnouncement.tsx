import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  priority: z.string().optional(),
  status: z.string().optional(),
});

const EditAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: "normal",
      status: "active",
    },
  });

  const { data: announcement, isLoading } = useQuery({
    queryKey: ["announcement", id],
    queryFn: async () => {
      // Validate UUID format before making the request
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!id || !uuidRegex.test(id)) {
        toast({
          title: "Invalid Announcement ID",
          description: "Please select a valid announcement to edit",
          variant: "destructive",
        });
        navigate("/announcements");
        throw new Error("Invalid announcement ID format");
      }

      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error loading announcement",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (!data) {
        toast({
          title: "Announcement not found",
          description: "The requested announcement could not be found",
          variant: "destructive",
        });
        navigate("/announcements");
        throw new Error("Announcement not found");
      }

      // Set form values when data is loaded
      form.reset({
        title: data.title,
        content: data.content,
        priority: data.priority || "normal",
        status: data.status || "active",
      });

      return data;
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id) return;

    const { error } = await supabase
      .from("announcements")
      .update(values)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating announcement",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Announcement updated successfully",
    });
    navigate("/announcements");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Loading...</h1>
          <Button variant="outline" onClick={() => navigate("/announcements")}>
            Back to Announcements
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Announcement</h1>
        <Button variant="outline" onClick={() => navigate("/announcements")}>
          Back to Announcements
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/announcements")}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAnnouncement;