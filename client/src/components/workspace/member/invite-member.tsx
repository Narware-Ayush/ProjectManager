import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/auth-provider";
import { toast } from "@/hooks/use-toast";
import { CheckIcon, CopyIcon, Loader } from "lucide-react";
import { BASE_ROUTE } from "@/routes/common/routePaths";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";

const InviteMember = () => {
  const { workspace, workspaceLoading } = useAuthContext();
  const [copied, setCopied] = useState(false);

  const inviteUrl = workspace
    ? `${window.location.origin}${BASE_ROUTE.INVITE_URL.replace(
        ":inviteCode",
        workspace.inviteCode
      )}`
    : "";

  const handleCopy = () => {
    if (inviteUrl) {
      navigator.clipboard.writeText(inviteUrl).then(() => {
        setCopied(true);
        toast({
          title: "Copied",
          description: "Invite link copied to clipboard",
          variant: "success",
        });
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 space-y-3">
      {/* Header */}
      <h5 className="text-lg font-semibold leading-[1.4] text-gray-900">
        Invite Members
      </h5>
      <p className="text-sm text-gray-600 leading-tight">
        Anyone with this invite link can join your workspace. You can disable
        it or generate a new link anytime.
      </p>

      {/* Permission-protected Input */}
      <PermissionsGuard showMessage requiredPermission={Permissions.ADD_MEMBER}>
        {workspaceLoading ? (
          <Loader className="w-8 h-8 animate-spin place-self-center" />
        ) : (
          <div className="flex gap-2 mt-2">
            <Label htmlFor="link" className="sr-only">
              Invite Link
            </Label>
            <Input
              id="link"
              value={inviteUrl}
              readOnly
              disabled
              className="disabled:opacity-100 disabled:pointer-events-none"
            />
            <Button size="icon" onClick={handleCopy}>
              {copied ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
            </Button>
          </div>
        )}
      </PermissionsGuard>
    </div>
  );
};

export default InviteMember;
