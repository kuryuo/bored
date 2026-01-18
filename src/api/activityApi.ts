import axios from "axios";
import type { Activity, Filters } from "@/types";

const BASE_URL = "/api";

export const activityApi = {
    getRandom: async (): Promise<Activity> => {
        const res = await axios.get<Activity>(`${BASE_URL}/random`);
        return res.data;
    },

    getByFilters: async (filters: Filters): Promise<Activity[]> => {
        const res = await axios.get<Activity[]>(`${BASE_URL}/filter`, { params: filters });
        return res.data;
    },

    getByKey: async (key: string): Promise<Activity> => {
        const res = await axios.get<Activity>(`${BASE_URL}/activity/${key}`);
        return res.data;
    },
};
