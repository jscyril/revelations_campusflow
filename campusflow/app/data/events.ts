export interface Event {
    id: string;
    title: string;
    subtitle: string;
    organizer: string;
    location: string;
    image: string;
    heroImage: string;
    date: string;
    fullDate: string;
    time: string;
    status: string;
    statusColor: string;
    category: string;
    slots: number;
    slotsRemaining: number;
    entryFee: string;
    description: string;
    tags: string[];
    timeline: TimelineItem[];
    host: HostInfo;
}

export interface TimelineItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    time: string;
    isActive: boolean;
    isComplete: boolean;
}

export interface HostInfo {
    name: string;
    department: string;
    status: string;
    message: string;
}

export const events: Event[] = [
    {
        id: "hackmatrix-2024",
        title: "HACKMATRIX 2024",
        subtitle: "Can you crack the code before the gate opens? The Upside Down awaits.",
        organizer: "Hellfire Club",
        location: "Hawkins High AV Club",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop",
        date: "FRI 8PM",
        fullDate: "Oct 31, 2024",
        time: "09:00 AM - 09:00 PM",
        status: "RSVP Required",
        statusColor: "#e50914",
        category: "hellfire",
        slots: 50,
        slotsRemaining: 11,
        entryFee: "$0.00",
        description: "Welcome to Hawkins. Strange energy fluctuations have been detected in the computer lab. Your mission is to secure the network before the rift expands.\n\nForm your squad of elite hackers. You have 24 hours to patch the vulnerabilities. Coding skills required. Courage mandatory. Do not let the Demogorgon into the server room.",
        tags: ["Python / C++", "Teams of 3-4", "Hawkins High AV Club"],
        timeline: [
            {
                id: "1",
                title: "Breach Detected",
                subtitle: "Opening Ceremony & Team Formation",
                description: "Initial briefing on security protocols. All teams must be registered and present.",
                time: "09:00 AM",
                isActive: true,
                isComplete: false,
            },
            {
                id: "2",
                title: "Rations Distributed",
                subtitle: "Lunch Break (Pizza & Eggos)",
                description: "",
                time: "12:00 PM",
                isActive: false,
                isComplete: false,
            },
            {
                id: "3",
                title: "Dimensional Gate Study",
                subtitle: "Workshop: Advanced Cybersecurity",
                description: "",
                time: "04:00 PM",
                isActive: false,
                isComplete: false,
            },
            {
                id: "4",
                title: "System Overload",
                subtitle: "Submission Deadline. Any code submitted after this time will be lost to the Void.",
                description: "",
                time: "08:00 PM",
                isActive: false,
                isComplete: false,
            },
        ],
        host: {
            name: "HAWKINS LAB",
            department: "Dept. of Energy",
            status: "Monitoring active.",
            message: '"Friends don\'t lie."',
        },
    },
    {
        id: "science-fair-void",
        title: "Science Fair: The Void",
        subtitle: "Explore the unknown dimensions through science.",
        organizer: "Hawkins Lab",
        location: "Main Hall",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=600&fit=crop",
        date: "SAT 10AM",
        fullDate: "Nov 2, 2024",
        time: "10:00 AM - 05:00 PM",
        status: "Open to all subjects",
        statusColor: "#22c55e",
        category: "lab",
        slots: 100,
        slotsRemaining: 45,
        entryFee: "$0.00",
        description: "Present your scientific discoveries and experiments. All subjects welcome. Best projects will be featured in the Hawkins Lab archives.",
        tags: ["All Subjects", "Individual/Team", "Main Hall"],
        timeline: [
            {
                id: "1",
                title: "Registration Opens",
                subtitle: "Project Setup",
                description: "Set up your display and prepare your presentation.",
                time: "10:00 AM",
                isActive: true,
                isComplete: false,
            },
            {
                id: "2",
                title: "Judging Begins",
                subtitle: "Expert Panel Review",
                description: "",
                time: "01:00 PM",
                isActive: false,
                isComplete: false,
            },
            {
                id: "3",
                title: "Awards Ceremony",
                subtitle: "Winners Announced",
                description: "",
                time: "04:30 PM",
                isActive: false,
                isComplete: false,
            },
        ],
        host: {
            name: "HAWKINS LAB",
            department: "Research Division",
            status: "Experiments ongoing.",
            message: '"For science!"',
        },
    },
    {
        id: "snowball-dance",
        title: "Snowball Dance '84",
        subtitle: "The most magical night of the year.",
        organizer: "Socials",
        location: "School Gym",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
        date: "DEC 15",
        fullDate: "Dec 15, 2024",
        time: "07:00 PM - 11:00 PM",
        status: "Formal Attire",
        statusColor: "#3b82f6",
        category: "socials",
        slots: 200,
        slotsRemaining: 78,
        entryFee: "$5.00",
        description: "Join us for the annual Snowball Dance. Dress to impress and dance the night away. Refreshments provided.",
        tags: ["Formal Attire", "Couples/Singles", "School Gym"],
        timeline: [
            {
                id: "1",
                title: "Doors Open",
                subtitle: "Welcome & Photos",
                description: "",
                time: "07:00 PM",
                isActive: true,
                isComplete: false,
            },
            {
                id: "2",
                title: "Dance Floor Opens",
                subtitle: "DJ starts spinning",
                description: "",
                time: "08:00 PM",
                isActive: false,
                isComplete: false,
            },
        ],
        host: {
            name: "STUDENT COUNCIL",
            department: "Events Committee",
            status: "Preparations complete.",
            message: '"Every legend has a beginning."',
        },
    },
    {
        id: "arcade-night",
        title: "Arcade Night",
        subtitle: "High scores and glory await.",
        organizer: "Palace Arcade",
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=600&fit=crop",
        date: "TONIGHT",
        fullDate: "Tonight",
        time: "06:00 PM - 12:00 AM",
        status: "High Scores Only",
        statusColor: "#facc15",
        category: "socials",
        slots: 50,
        slotsRemaining: 12,
        entryFee: "$2.00",
        description: "Grab your quarters and compete for the highest scores. Featuring classics like Dig Dug, Dragon's Lair, and Centipede.",
        tags: ["Arcade Games", "All Ages", "Palace Arcade"],
        timeline: [
            {
                id: "1",
                title: "Arcade Opens",
                subtitle: "Free Play Begins",
                description: "",
                time: "06:00 PM",
                isActive: true,
                isComplete: false,
            },
            {
                id: "2",
                title: "Tournament Starts",
                subtitle: "Compete for prizes",
                description: "",
                time: "08:00 PM",
                isActive: false,
                isComplete: false,
            },
        ],
        host: {
            name: "PALACE ARCADE",
            department: "Gaming Central",
            status: "Machines ready.",
            message: '"Insert coin to continue."',
        },
    },
];

export const categories = [
    { id: "all", label: "All Signals" },
    { id: "hellfire", label: "Hellfire Club" },
    { id: "lab", label: "Lab Experiments" },
    { id: "socials", label: "Socials" },
    { id: "forbidden", label: "Forbidden", locked: true },
];

export function getEventById(id: string): Event | undefined {
    return events.find((event) => event.id === id);
}
