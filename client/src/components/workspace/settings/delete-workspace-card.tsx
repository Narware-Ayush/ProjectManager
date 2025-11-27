import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Button } from "@/components/ui/button";
import { Permissions } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import useConfirmDialog from "@/hooks/use-confirm-dialog";
import { toast } from "@/hooks/use-toast";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { deleteWorkspaceMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const DeleteWorkspaceCard = () => {
  const { workspace } = useAuthContext();
  const navigate = useNavigate();
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const { open, onOpenDialog, onCloseDialog } = useConfirmDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkspaceMutationFn,
  });

  const handleConfirm = () => {
    mutate(workspaceId, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["userWorkspaces"] });
        navigate(`/workspace/${data.currentWorkspace}`);
        setTimeout(() => onCloseDialog(), 100);
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
    <>
      <div className="w-full max-w-full">
        <div className="mb-5 border-b pb-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Delete Workspace
          </h2>
        </div>

        <PermissionsGuard
          showMessage
          requiredPermission={Permissions.DELETE_WORKSPACE}
        >
          <div className="flex flex-col space-y-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Deleting a workspace is permanent and cannot be undone. Once you
              delete a workspace, all associated data—including projects, tasks,
              and member roles—will be permanently removed. Proceed with caution.
            </p>

            <div className="flex justify-end">
              <Button
                className="h-10 px-4 font-semibold"
                variant="destructive"
                onClick={onOpenDialog}
                disabled={isPending}
              >
                Delete Workspace
              </Button>
            </div>
          </div>
        </PermissionsGuard>
      </div>

      <ConfirmDialog
        isOpen={open}
        isLoading={isPending}
        onClose={onCloseDialog}
        onConfirm={handleConfirm}
        title={`Delete ${workspace?.name || "this"} Workspace`}
        description="Are you sure you want to delete this workspace? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default DeleteWorkspaceCard;
