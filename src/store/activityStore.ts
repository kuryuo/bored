import { create } from "zustand";
import type { ActivityStore, Filters } from "@/types";
import { activityApi } from "@/api/activityApi";

export const useActivityStore = create<ActivityStore>((set, get) => ({
    activity: null,
    activities: [],
    filters: {},
    isLoading: false,
    error: null,

    fetchRandom: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await activityApi.getRandom();
            set({ activity: data, isLoading: false });
        } catch (e: any) {
            set({ error: e.message || "Ошибка загрузки", isLoading: false });
        }
    },

    fetchByFilters: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await activityApi.getByFilters(get().filters);
            set({ activities: data, isLoading: false });
        } catch (e: any) {
            set({ error: e.message || "Ошибка загрузки", isLoading: false });
        }
    },

    setFilters: (filters: Partial<Filters>) => {
        set({ filters: { ...get().filters, ...filters } });
    },

    clearFilters: () => set({ filters: {} }),
    clearActivity: () => set({ activity: null }),
}));
