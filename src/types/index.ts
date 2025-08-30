import { BlogPostForm } from "@/lib/validators";

export interface BlogPost extends BlogPostForm {
    id: string;
    createdAt: string;
    isLiked?: boolean;
}
