"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProgressBar } from "@/components/wizard/progress-bar";
import { ReviewStep } from "@/components/wizard/review-step";
import { Step1 } from "@/components/wizard/step1";
import { Step2 } from "@/components/wizard/step2";
import { Step3 } from "@/components/wizard/step3";
import { updatePost } from "@/lib/api";
import { blogPostSchema, BlogPostForm } from "@/lib/validators";
import { BlogPost } from "@/types";

const stepFields: (keyof BlogPostForm)[][] = [["title", "author"], ["summary", "category"], ["content"]];

interface EditFormProps {
    initialData: BlogPost;
}

export function EditForm({ initialData }: EditFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<BlogPostForm>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: initialData,
    });

    const nextStep = async () => {
        const fieldsToValidate = stepFields[currentStep - 1];
        const isValid = await form.trigger(fieldsToValidate as never);
        if (isValid && currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const onSubmit = async (data: BlogPostForm) => {
        setIsSubmitting(true);
        try {
            await updatePost(initialData.id, data);
            toast.success("Success!", { description: "Blog post updated successfully." });
            router.push(`/blog/${initialData.id}`);
            router.refresh();
        } catch (error) {
            toast.error("Update Failed", { description: "An error occurred. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const stepTitles = ["Edit Metadata", "Edit Summary & Category", "Edit Content", "Review & Save"];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-2xl mx-auto p-8 bg-card rounded-lg border"
            >
                <h1 className="text-3xl font-bold">{stepTitles[currentStep - 1]}</h1>
                <ProgressBar currentStep={currentStep} totalSteps={4} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[300px]"
                    >
                        {currentStep === 1 && <Step1 form={form} />}
                        {currentStep === 2 && <Step2 form={form} />}
                        {currentStep === 3 && <Step3 form={form} />}
                        {currentStep === 4 && <ReviewStep formData={form.getValues()} />}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between items-center pt-4 border-t">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                        Back
                    </Button>
                    {currentStep < 4 ? (
                        <Button type="button" onClick={nextStep}>
                            Next
                        </Button>
                    ) : (
                        <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
