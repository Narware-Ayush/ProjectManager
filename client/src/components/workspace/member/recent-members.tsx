import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import { Loader } from "lucide-react";

const RecentMembers = () => {
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspaceMembers(workspaceId);

  const members = data?.members || [];

  return (
    <div className="flex flex-col pt-2">
      {isPending && (
        <Loader className="w-8 h-8 animate-spin place-self-center my-5" />
      )}

      {members.length === 0 && !isPending && (
        <div className="text-center py-5 text-sm text-gray-500 font-medium">
          No members in this workspace yet
        </div>
      )}

      <ul role="list" className="space-y-3">
        {members.map((member, index) => {
          const name = member?.userId?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            <li
              key={index}
              role="listitem"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow hover:bg-gray-50"
            >
              {/* Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={member.userId.profilePicture || ""}
                  alt={member.userId.name}
                />
                <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
              </Avatar>

              {/* Member Details */}
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">{member.userId.name}</p>
                <p className="text-sm text-gray-500">{member.role.name}</p>
              </div>

              {/* Joined Date */}
              <div className="ml-auto text-sm text-gray-500 text-right">
                <p className="font-medium">Joined</p>
                <p>{member.joinedAt ? format(member.joinedAt, "PPP") : "-"}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentMembers;
