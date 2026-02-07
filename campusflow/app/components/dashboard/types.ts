export interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    xp: number;
    level: number;
    xpToNextLevel: number;
    stats: {
        eventsAttended: number;
        eventsRegistered: number;
        eventsOrganized: number;
        badgesEarned: number;
    };
    activeRegistrations: Array<{
        id: string;
        event: {
            id: string;
            title: string;
            date: string;
            status: string;
            heroImage?: string;
        };
    }>;
    pastRegistrations: Array<{
        id: string;
        event: {
            id: string;
            title: string;
            date: string;
        };
    }>;
    badges: Array<{
        id: string;
        name: string;
        icon: string;
        description: string;
    }>;
}
