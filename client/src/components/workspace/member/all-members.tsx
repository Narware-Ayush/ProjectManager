import { ChevronDown, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { useAuthContext } from "@/context/auth-provider";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeWorkspaceMemberRoleMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Permissions } from "@/constant";

const AllMembers = () => {
  const { user, hasPermission } = useAuthContext();
  const canChangeMemberRole = hasPermission(Permissions.CHANGE_MEMBER_ROLE);
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const { data, isPending } = useGetWorkspaceMembers(workspaceId);
  const members = data?.members || [];
  const roles = data?.roles || [];

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: changeWorkspaceMemberRoleMutationFn,
  });

  const handleSelect = (roleId: string, memberId: string) => {
    if (!roleId || !memberId) return;
    const payload = { workspaceId, data: { roleId, memberId } };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
        toast({
          title: "Success",
          description: "Member's role changed successfully",
          variant: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="grid gap-4 pt-2">
      {isPending && (
        <Loader className="w-8 h-8 animate-spin place-self-center flex" />
      )}

      {members.map((member) => {
        const name = member.userId?.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return (
          <div
            key={member.userId._id}
            className="flex items-center justify-between gap-4 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
                <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{member.userId.email}</p>
              </div>
            </div>

            {/* Role Selector */}
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-[120px] capitalize flex justify-between"
                    disabled={
                      isLoading ||
                      !canChangeMemberRole ||
                      member.userId._id === user?._id
                    }
                  >
                    {member.role.name?.toLowerCase()}{" "}
                    {canChangeMemberRole &&
                      member.userId._id !== user?._id && (
                        <ChevronDown className="ml-1 text-muted-foreground" />
                      )}
                  </Button>
                </PopoverTrigger>

                {canChangeMemberRole && (
                  <PopoverContent className="p-0 w-56" align="end">
                    <Command>
                      <CommandInput
                        placeholder="Select new role..."
                        disabled={isLoading}
                        className="disabled:pointer-events-none"
                      />
                      <CommandList>
                        {isLoading ? (
                          <Loader className="w-6 h-6 animate-spin place-self-center my-4" />
                        ) : (
                          <>
                            <CommandEmpty>No roles found.</CommandEmpty>
                            <CommandGroup>
                              {roles
                                ?.filter((r) => r.name !== "OWNER")
                                .map((role) => (
                                  <CommandItem
                                    key={role._id}
                                    disabled={isLoading}
                                    className="gap-1 mb-1 flex flex-col items-start px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                                    onSelect={() =>
                                      handleSelect(role._id, member.userId._id)
                                    }
                                  >
                                    <p className="capitalize font-medium">{role.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {role.name === "ADMIN"
                                        ? "Can view, create, edit tasks, projects and manage settings."
                                        : "Can view/edit only tasks assigned to them."}
                                    </p>
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllMembers;
