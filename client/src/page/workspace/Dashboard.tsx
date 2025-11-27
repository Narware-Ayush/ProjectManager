import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();

  return (
    <main className="flex flex-1 flex-col gap-6 py-6 px-3 md:px-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-800">
            Workspace Overview
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor and manage your workspace activities efficiently.
          </p>
        </div>

        <Button
          onClick={onOpen}
          className="gap-2 shadow-sm hover:shadow-md transition rounded-xl"
        >
          <Plus className="h-5 w-5" />
          Create Project
        </Button>
      </div>

      {/* Analytics Section */}
      <div className="rounded-xl border bg-gradient-to-br from-gray-50 to-white shadow-sm p-4">
        <WorkspaceAnalytics />
      </div>

      {/* Tabs Section */}
      <div className="rounded-xl border shadow-sm p-3 bg-white">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="w-full justify-start h-12 bg-gray-100 rounded-lg px-1">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              📁 Recent Projects
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              ✅ Recent Tasks
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              👥 Recent Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-4">
            <RecentProjects />
          </TabsContent>
          <TabsContent value="tasks" className="mt-4">
            <RecentTasks />
          </TabsContent>
          <TabsContent value="members" className="mt-4">
            <RecentMembers />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default WorkspaceDashboard;
