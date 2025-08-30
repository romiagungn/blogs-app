import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BlogPostForm } from "@/lib/validators";

interface StepProps {
    form: UseFormReturn<BlogPostForm>;
}

export function Step1({ form }: StepProps) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blog Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., The Future of AI" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
