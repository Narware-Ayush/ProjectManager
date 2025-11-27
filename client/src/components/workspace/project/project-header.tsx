import { useParams } from "react-router-dom";
import CreateTaskDialog from "../task/create-task-dialog";
import EditProjectDialog from "./edit-project-dialog";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjectByIdQueryFn } from "@/lib/api";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";

const ProjectHeader = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const workspaceId = useWorkspaceId();

  const { data, isPending, isError } = useQuery({
    queryKey: ["singleProject", projectId],
    queryFn: () =>
      getProjectByIdQueryFn({
        workspaceId,
        projectId: projectId!,
      }),
    staleTime: Infinity,
    enabled: !!projectId,
    placeholderData: keepPreviousData,
  });

  const project = data?.project;

  const projectEmoji = project?.emoji || "📊";
  const projectName = project?.name || "Untitled project";

  const renderContent = () => {
    if (isPending)
      return <span className="text-gray-500 animate-pulse">Loading...</span>;
    if (isError)
      return <span className="text-red-500">Error occurred</span>;
    return (
      <>
        <span className="text-2xl">{projectEmoji}</span>
        <span className="truncate font-semibold text-gray-900 text-lg md:text-xl">
          {projectName}
        </span>
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-3">
        <h2 className="flex items-center gap-2 truncate">{renderContent()}</h2>
        <PermissionsGuard requiredPermission={Permissions.EDIT_PROJECT}>
          <EditProjectDialog project={project} />
        </PermissionsGuard>
      </div>
      <CreateTaskDialog projectId={projectId!} />
    </div>
  );
};

export default ProjectHeader;
