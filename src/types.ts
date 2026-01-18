export interface Activity {
    activity: string;
    availability: number;
    type: string;
    participants: number;
    price: number;
    accessibility: string;
    duration: string;
    kidFriendly: boolean;
    link?: string;
    key: string;
}

export interface Filters {
    type?: string;
    participants?: number;
}

export interface ActivityStore {
    activity: Activity | null;
    activities: Activity[];
    filters: Filters;
    isLoading: boolean;
    error: string | null;

    fetchRandom: () => Promise<void>;
    fetchByFilters: () => Promise<void>;
    setFilters: (filters: Partial<Filters>) => void;
    clearFilters: () => void;
    clearActivity: () => void;
}
