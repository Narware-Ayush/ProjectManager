import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import {
  getAvatarColor,
  getAvatarFallbackText,
  transformStatusEnum,
} from "@/lib/helper";
import { TaskType } from "@/types/api.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader } from "lucide-react";

const RecentTasks = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () =>
      getAllTasksQueryFn({
        workspaceId,
      }),
    staleTime: 0,
    enabled: !!workspaceId,
  });

  const tasks: TaskType[] = data?.tasks || [];

  return (
    <div className="flex flex-col space-y-4">
      {isLoading && (
        <Loader className="w-10 h-10 animate-spin place-self-center text-gray-400" />
      )}

      {tasks?.length === 0 && (
        <div className="text-center text-gray-500 font-medium py-6">
          No Tasks created yet
        </div>
      )}

      <ul role="list" className="space-y-3">
        {tasks.map((task) => {
          const name = task?.assignedTo?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            <li
              key={task._id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              {/* Task Info */}
              <div className="flex flex-col flex-grow gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  {task.taskCode}
                </span>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {task.title}
                </p>
                <span className="text-xs text-gray-500">
                  Due: {task.dueDate ? format(task.dueDate, "PPP") : "-"}
                </span>
              </div>

              {/* Task Status */}
              <Badge
                variant={TaskStatusEnum[task.status]}
                className="uppercase text-xs font-medium px-2 py-1 shadow-sm border-0"
              >
                {transformStatusEnum(task.status)}
              </Badge>

              {/* Task Priority */}
              <Badge
                variant={TaskPriorityEnum[task.priority]}
                className="uppercase text-xs font-medium px-2 py-1 shadow-sm border-0"
              >
                {transformStatusEnum(task.priority)}
              </Badge>

              {/* Assignee */}
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={task.assignedTo?.profilePicture || ""}
                    alt={task.assignedTo?.name}
                  />
                  <AvatarFallback className={avatarColor}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600 font-medium hidden sm:inline">
                  {name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTasks;
