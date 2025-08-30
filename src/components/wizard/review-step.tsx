import { BlogPostForm } from "@/lib/validators";

interface ReviewStepProps {
    formData: BlogPostForm;
}

export function ReviewStep({ formData }: ReviewStepProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Review & Submit</h2>
            <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                    <p className="text-lg">{formData.title}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Author</h3>
                    <p className="text-lg">{formData.author}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <p className="text-lg">{formData.category}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Summary</h3>
                    <p className="text-lg italic">{formData.summary}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                    <p className="whitespace-pre-wrap">{formData.content}</p>
                </div>
            </div>
        </div>
    );
}
