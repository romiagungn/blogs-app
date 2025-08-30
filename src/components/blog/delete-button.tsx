"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { deletePost } from "@/lib/api";
import { cn } from "@/lib/utils";

interface DeleteButtonProps extends VariantProps<typeof buttonVariants> {
    postId: string;
    children?: React.ReactNode;
}

export function DeleteButton({ postId, children, variant = "ghost", size = "icon" }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deletePost(postId);
            toast.success("Post deleted successfully.");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete the post.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className={cn(variant === "ghost" && "p-2 text-muted-foreground hover:text-destructive")}
                >
                    {children ? children : <Trash2 className="w-6 h-6 transition-colors duration-300" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this blog post.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {isDeleting && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
                        Delete Post
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
