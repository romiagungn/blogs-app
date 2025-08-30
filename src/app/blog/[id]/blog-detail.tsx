"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2, Calendar, Quote } from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/api";
import { BlogPost } from "@/types";
import { LikeButton } from "@/components/blog/like-button";

interface BlogDetailProps {
    post: BlogPost;
}

export function BlogDetail({ post }: BlogDetailProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deletePost(post.id);
            toast.success("Success", { description: "Post deleted successfully." });
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error("Error", { description: "Failed to delete the post." });
            setIsDeleting(false);
        }
    };

    const authorInitials = post.author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <article className="relative max-w-3xl mx-auto py-8 px-4 sm:px-0">
            <div className="absolute top-8 right-0 flex gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
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
                            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <header className="mb-8">
                <div className="mb-4">
                    <Badge variant="default">{post.category}</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight mb-4">
                    {post.title}
                </h1>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                                    alt={post.author}
                                />
                                <AvatarFallback>{authorInitials}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{post.author}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.createdAt}>
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    </div>
                    <div>
                        <LikeButton postId={post.id} initialLiked={post.isLiked} />
                    </div>
                </div>
            </header>

            <div className="prose prose-lg max-w-none prose-slate dark:prose-invert">
                <blockquote>{post.summary}</blockquote>
                {post.content
                    .split("\n")
                    .map((paragraph, index) => paragraph.trim() !== "" && <p key={index}>{paragraph}</p>)}
            </div>
        </article>
    );
}
