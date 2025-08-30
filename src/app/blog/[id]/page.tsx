import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/api";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BlogDetail } from "@/app/blog/[id]/blog-detail";

interface BlogDetailPageProps {
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

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const param = await params;
    const post = await getBlogPost(param.id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Posts
                </Link>
            </Button>

            <BlogDetail post={post} />
        </div>
    );
}
