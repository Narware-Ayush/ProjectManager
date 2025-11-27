import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth-provider";
import { Loader } from "lucide-react";

const WorkspaceHeader = () => {
  const { workspaceLoading, workspace } = useAuthContext();

  return (
    <div className="w-full max-w-3xl mx-auto pb-4">
      {workspaceLoading ? (
        <div className="flex justify-center py-4">
          <Loader className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          {/* Workspace Avatar */}
          <Avatar className="h-14 w-14 rounded-lg text-2xl font-bold">
            <AvatarFallback className="rounded-lg bg-gradient-to-tl from-indigo-600 to-purple-600 text-white flex items-center justify-center">
              {workspace?.name?.split(" ")?.[0]?.charAt(0) || "W"}
            </AvatarFallback>
          </Avatar>

          {/* Workspace Info */}
          <div className="flex flex-col flex-1 truncate">
            <span className="text-xl font-semibold truncate text-gray-900">
              {workspace?.name}
            </span>
            <span className="text-sm text-gray-500 truncate">Free plan</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceHeader;
