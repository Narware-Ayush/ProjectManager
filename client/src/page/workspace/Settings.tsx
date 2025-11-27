import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";

const Settings = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Workspace Header */}
      <WorkspaceHeader />

      <Separator className="my-4" />

      <main className="w-full max-w-3xl mx-auto py-6 px-4 md:px-6 space-y-6">
        {/* Page Title */}
        <h2 className="text-2xl font-semibold text-gray-900">
          Workspace Settings
        </h2>

        {/* Edit Workspace Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <EditWorkspaceForm />
        </div>

        {/* Delete Workspace Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <DeleteWorkspaceCard />
        </div>
      </main>
    </div>
  );
};

const SettingsWithPermission = withPermission(
  Settings,
  Permissions.MANAGE_WORKSPACE_SETTINGS
);

export default SettingsWithPermission;
