"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LeaderboardUser {
    id: string;
    name: string;
    xp: number;
    level: number;
    department?: string;
    eventsAttended: number;
    badgeCount: number;
}

export default function LeaderboardPage() {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // For now, use mock data since we don't have a leaderboard API
        const mockLeaderboard: LeaderboardUser[] = [
            { id: "1", name: "Jane Hopper", xp: 5000, level: 5, department: "Psychic Division", eventsAttended: 15, badgeCount: 5 },
            { id: "2", name: "Dr. Martin Brenner", xp: 5000, level: 5, department: "Department of Energy", eventsAttended: 20, badgeCount: 4 },
            { id: "3", name: "Jim Hopper", xp: 3500, level: 4, department: "Hawkins Police", eventsAttended: 12, badgeCount: 3 },
            { id: "4", name: "Mike Wheeler", xp: 2500, level: 3, department: "AV Club", eventsAttended: 8, badgeCount: 2 },
            { id: "5", name: "Dustin Henderson", xp: 1800, level: 2, department: "Science Club", eventsAttended: 6, badgeCount: 1 },
        ];
        setUsers(mockLeaderboard);
        setIsLoading(false);
    }, []);

    const getRankIcon = (index: number) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        return `#${index + 1}`;
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Header */}
            <div className="pt-24 pb-8 px-6 max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl">🏆</span>
                    <h1 className="text-4xl font-black text-[#e50914]">POWER RANKINGS</h1>
                </div>
                <p className="text-[#888]">Top agents by XP accumulated across all dimensions</p>
            </div>

            {/* Leaderboard */}
            <section className="max-w-4xl mx-auto px-6 pb-12">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="text-[#22c55e] font-mono animate-pulse text-xl">
                            CALCULATING POWER LEVELS...
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {users.map((user, index) => (
                            <div
                                key={user.id}
                                className={`flex items-center gap-4 p-4 rounded-lg border ${index === 0 ? "border-yellow-500 bg-yellow-500/10" :
                                        index === 1 ? "border-gray-400 bg-gray-400/10" :
                                            index === 2 ? "border-orange-600 bg-orange-600/10" :
                                                "border-[#2a2a2a] bg-[#111]"
                                    }`}
                            >
                                {/* Rank */}
                                <div className="text-2xl w-12 text-center">{getRankIcon(index)}</div>

                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-[#e50914] flex items-center justify-center text-white font-bold text-lg">
                                    {user.name.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="font-bold text-white">{user.name}</div>
                                    <div className="text-[#888] text-sm">{user.department}</div>
                                </div>

                                {/* Stats */}
                                <div className="text-right">
                                    <div className="text-[#22c55e] font-mono font-bold text-lg">
                                        {user.xp.toLocaleString()} XP
                                    </div>
                                    <div className="text-[#888] text-xs">
                                        Level {user.level} • {user.eventsAttended} events • {user.badgeCount} badges
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link href="/dashboard" className="text-[#e50914] font-mono hover:underline">
                        &lt; RETURN TO DASHBOARD
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
