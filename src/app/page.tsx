import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getAllPosts } from "@/lib/api";
import { LikeButton } from "@/components/blog/like-button";
import { CardSkeleton } from "@/components/blog/card-skeleton";

export const dynamic = "force-dynamic";

async function BlogList() {
    const posts = await getAllPosts();

    if (posts.length === 0) {
        return (
            <div className="col-span-full text-center py-20 px-6 border-2 border-dashed rounded-lg">
                <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-xl font-semibold">No posts found</h3>
                <p className="mt-1 text-muted-foreground">Get started by creating a new blog post.</p>
                <div className="mt-6">
                    <Button asChild>
                        <Link href="/create">Create Post</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`} className="block">
            <Card className="flex flex-col justify-between h-full group hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="group-hover:text-primary">{post.title}</CardTitle>
                    <CardDescription>
                        By {post.author} in {post.category}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-end pt-4">
                    <LikeButton postId={post.id} initialLiked={post.isLiked} />
                </CardFooter>
            </Card>
        </Link>
    ));
}

function BlogListSkeleton() {
    return Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />);
}

export default function HomePage() {
    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Blog Posts</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<BlogListSkeleton />}>
                    <BlogList />
                </Suspense>
            </div>
        </section>
    );
}
