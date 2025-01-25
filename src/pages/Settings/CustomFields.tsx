import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomFieldsManager } from "@/components/CustomFieldsManager";
import { Settings } from "lucide-react";

export default function CustomFieldsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Custom Fields Management</h1>
      </div>

      <Tabs defaultValue="officer" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="officer">Officer Fields</TabsTrigger>
          <TabsTrigger value="soldier">Soldier Fields</TabsTrigger>
          <TabsTrigger value="case">Case Fields</TabsTrigger>
        </TabsList>
        <TabsContent value="officer" className="mt-6">
          <CustomFieldsManager entity="officer" />
        </TabsContent>
        <TabsContent value="soldier" className="mt-6">
          <CustomFieldsManager entity="soldier" />
        </TabsContent>
        <TabsContent value="case" className="mt-6">
          <CustomFieldsManager entity="case" />
        </TabsContent>
      </Tabs>
    </div>
  );
}