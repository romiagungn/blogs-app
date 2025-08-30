import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { BlogPostForm } from "@/lib/validators";

interface StepProps {
    form: UseFormReturn<BlogPostForm>;
}

export function Step3({ form }: StepProps) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blog Content</FormLabel>
                        <FormControl>
                            <Textarea rows={10} placeholder="Write your full blog post here..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
