"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toggleLikeStatus } from "@/lib/api";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
    postId: string;
    initialLiked?: boolean;
}

export function LikeButton({ postId, initialLiked = false }: LikeButtonProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleLike = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        const newLikedState = !liked;
        setLiked(newLikedState);

        try {
            await toggleLikeStatus(postId, liked);

            if (newLikedState) {
                toast.success("Added to your favorites!");
            }

            router.refresh();
        } catch (error) {
            setLiked(liked);
            toast.error("Failed to update like status.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.button
            onClick={handleLike}
            whileTap={{ scale: 1.2, rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label="Like post"
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20"
        >
            <Heart
                className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    liked ? "text-red-500 fill-red-500" : "text-slate-400",
                )}
            />
        </motion.button>
    );
}
