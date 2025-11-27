import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useAuthContext } from "@/context/auth-provider";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editWorkspaceMutationFn } from "@/lib/api";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { Permissions } from "@/constant";

export default function EditWorkspaceForm() {
  const { workspace, hasPermission } = useAuthContext();
  const canEditWorkspace = hasPermission(Permissions.EDIT_WORKSPACE);

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useMutation({
    mutationFn: editWorkspaceMutationFn,
  });

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Workspace name is required" }),
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (workspace) {
      form.setValue("name", workspace.name);
      form.setValue("description", workspace.description || "");
    }
  }, [form, workspace]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    const payload = { workspaceId, data: values };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workspace"] });
        queryClient.invalidateQueries({ queryKey: ["userWorkspaces"] });
        toast({
          title: "Success",
          description: "Workspace updated successfully",
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
    <div className="w-full max-w-full">
      <div className="mb-5 border-b pb-2">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Edit Workspace
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Workspace Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                  Workspace name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Taco's Co."
                    className="!h-12"
                    disabled={!canEditWorkspace}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Workspace Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                  Workspace description{" "}
                  <span className="text-xs font-light ml-1">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    disabled={!canEditWorkspace}
                    placeholder="Our team organizes marketing projects and tasks here."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          {canEditWorkspace && (
            <div className="flex justify-end">
              <Button
                type="submit"
                className="h-10 px-4 font-semibold flex items-center gap-2"
                disabled={isPending}
              >
                {isPending && <Loader className="h-4 w-4 animate-spin" />}
                Update Workspace
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
