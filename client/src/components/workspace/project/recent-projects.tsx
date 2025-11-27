import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import { Loader } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";

const RecentProjects = () => {
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 10,
  });

  const projects = data?.projects || [];

  return (
    <div className="flex flex-col pt-2">
      {isPending && (
        <Loader className="w-8 h-8 animate-spin place-self-center text-blue-600" />
      )}

      {projects.length === 0 && (
        <div className="font-semibold text-sm text-muted-foreground text-center py-5">
           No Project created yet — create your first!
        </div>
      )}

      <ul role="list" className="space-y-3">
        {projects.map((project) => {
          const name = project.createdBy.name;
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            <li
              key={project._id}
              role="listitem"
              className="cursor-pointer border bg-gradient-to-r from-white to-[#f7faff] shadow hover:shadow-md transition-all rounded-lg hover:scale-[1.01]"
            >
              <Link
                to={`/workspace/${workspaceId}/project/${project._id}`}
                className="grid gap-4 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl !leading-[1.4rem] hover:scale-125 transition-transform">
                    {project.emoji}
                  </div>
                  <div className="grid gap-1">
                    <p className="text-[15px] font-semibold text-gray-800">
                      {project.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.createdAt ? format(project.createdAt, "PPP") : null}
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm text-gray-600 font-medium">
                      👤 Created by
                    </span>
                    <Avatar className="h-9 w-9 shadow ring-2 ring-white">
                      <AvatarImage
                        src={project.createdBy.profilePicture || ""}
                        alt="Avatar"
                      />
                      <AvatarFallback className={avatarColor + " font-bold text-white"}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentProjects;
