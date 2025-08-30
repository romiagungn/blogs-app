import { notFound } from "next/navigation";
import { getPostById } from "@/lib/api";
import { BlogPost } from "@/types";
import { EditForm } from "@/app/blog/[id]/edit/edit-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditBlogPageProps {
    params: Promise<{ id: string }>;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
    try {
        return await getPostById(id);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
    const param = await params;
    const post = await getBlogPost(param.id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <Button asChild variant="ghost" className="mb-8">
                <Link href={`/blog/${post.id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Post
                </Link>
            </Button>
            <EditForm initialData={post} />
        </div>
    );
}
