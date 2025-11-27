
import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";

export default function Members() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Workspace Header */}
      <WorkspaceHeader />

      {/* Page Container */}
      <div className="w-full max-w-4xl mx-auto py-6 px-4 md:px-6">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Workspace Members</h2>
          <p className="text-sm text-gray-600">
            Members can view and join all workspace projects, manage tasks, and create new tasks within this workspace.
          </p>
        </div>

        <Separator className="my-6" />

        {/* Invite Member Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <InviteMember />
        </div>

        <Separator className="my-6" />

        {/* All Members Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <AllMembers />
        </div>
      </div>
    </div>
  );
}         