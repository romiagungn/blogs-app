import axios from "axios";
import { BlogPost } from "@/types";
import { BlogPostForm } from "@/lib/validators";

const API_BASE_URL = "https://68b3095bc28940c9e69dfe65.mockapi.io/api/v1";

const api = axios.create({
    baseURL: `${API_BASE_URL}/blogs`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllPosts = async (): Promise<BlogPost[]> => {
    const { data } = await api.get<BlogPost[]>("");
    return data;
};

export const getPostById = async (id: string): Promise<BlogPost> => {
    const { data } = await api.get<BlogPost>(`/${id}`);
    return data;
};

export const createPost = async (postData: BlogPostForm): Promise<BlogPost> => {
    const { data } = await api.post<BlogPost>("", { ...postData, createdAt: new Date().toISOString() });
    return data;
};

export const updatePost = async (id: string, postData: Partial<BlogPostForm>): Promise<BlogPost> => {
    const { data } = await api.put<BlogPost>(`/${id}`, postData);
    return data;
};

export const deletePost = async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
};

export const toggleLikeStatus = async (id: string, currentStatus: boolean): Promise<BlogPost> => {
    const { data } = await api.put<BlogPost>(`/${id}`, { isLiked: !currentStatus });
    return data;
};
